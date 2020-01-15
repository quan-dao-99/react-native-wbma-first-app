import React from 'react';
import { Image, Modal, Text, TouchableHighlight, View } from 'react-native';
import { PropTypes } from 'prop-types';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

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
            source={{uri: mediaUrl + item.filename}}
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

ImageModal.propTypes = {
  animationType: PropTypes.string,
  transparent: PropTypes.bool,
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  setModalVisible: PropTypes.func,
  item: PropTypes.object,
};

export default ImageModal;
