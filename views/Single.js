import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = (props) => {
  const {navigation} = props;
  const singleMedia = navigation.getParam('item', 'default');

  return (
    <React.Fragment>
      <Image
        source={{uri: mediaUrl + singleMedia.filename}}
        style={styles.image}
      />
      <View style={styles.textBox}>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </React.Fragment>
  );
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

export default Single;
