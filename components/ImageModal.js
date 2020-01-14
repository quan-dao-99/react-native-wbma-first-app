import React from 'react';
import { Image, Modal, Text, TouchableHighlight, View } from 'react-native';

const ImageModal = ({animationType, transparent, visible, onRequestClose, setModalVisible, item}) => {
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={{marginTop: 22}}>
        <View>
          <Image
            style={{width: 100, height: 100}}
            source={{uri: item.thumbnails.w160}}
          />
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>

          <TouchableHighlight
            onPress={setModalVisible}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

export default ImageModal;
