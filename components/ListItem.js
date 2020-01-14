import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from "react";
import { PropTypes } from 'prop-types';

const ListItem = ({singleMedia}) => {
  return (
    <TouchableOpacity>
      <Image
        style={{width: 100, height: 100}}
        source={{uri: singleMedia.thumbnails.w160}}
      />
      <View>
        <Text>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  )
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
