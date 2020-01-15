import { FlatList, StyleSheet } from 'react-native';
import ListItem from './ListItem';
import React, { useContext } from 'react';
import { MediaContext } from '../contexts/MediaContext';
import { getAllMedia } from '../hooks/APIHooks';

const List = () => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();
  setMedia(data);

  return (
    <FlatList
      data={media}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item}/>}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: 'black'
  }
});

export default List;
