import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from "react";
import { PropTypes } from 'prop-types';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = (props) => {
  const singleMedia = props.singleMedia;
  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => {
        props.navigation.push('Single', {
          item: singleMedia,
        });
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
    </React.Fragment>
  )
};

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
