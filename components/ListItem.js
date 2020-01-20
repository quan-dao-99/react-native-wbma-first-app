import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import ImageModal from "./ImageModal";

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
            style={styles.image}
            source={{uri: singleMedia.thumbnails.w160}}
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
    backgroundColor: '#e9e9e9',
    marginBottom: 20,
    elevation: 10,
    borderWidth: 2,
    borderColor: "#9bfffc"
  },
  image: {
    flex: 1,
    margin: 15,
    borderRadius: 50,
    marginRight: 0,
    resizeMode: 'contain'
  },
  textBox: {
    flex: 1,
    margin: 15
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e93f43",
  }
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
