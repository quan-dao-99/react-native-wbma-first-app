import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import ImageModal from "./ImageModal";

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

class ListItem extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const singleMedia = this.props.singleMedia;
    return (
      <React.Fragment>
        <TouchableOpacity onPress={() => {
          this.setModalVisible(true)
        }} style={styles.container}>
          <Image
            source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
            style={styles.image}
          />
          <View style={styles.textBox}>
            <Text style={styles.title}>{singleMedia.title}</Text>
            <Text>{singleMedia.description}</Text>
          </View>
        </TouchableOpacity>
        <ImageModal animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Image modal has been closed!');
                    }}
                    setModalVisible={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                    item={singleMedia}/>
      </React.Fragment>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    minHeight: 300,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'grey',
    marginBottom: 20,
  },
  image: {
    flex: 1,
    margin: 15,
    borderRadius: 10,
    marginRight: 0,
    resizeMode: 'contain'
  },
  textBox: {
    flex: 1,
    margin: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});


ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
