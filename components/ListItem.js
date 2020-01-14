import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
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
        }}>
          <Image
            style={{width: 100, height: 100}}
            source={{uri: singleMedia.thumbnails.w160}}
          />
          <View>
            <Text>{singleMedia.title}</Text>
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

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
