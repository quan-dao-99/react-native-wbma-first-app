import { List as BaseList } from 'native-base';
import ListItem from './ListItem';
import React, { useContext } from 'react';
import { MediaContext } from '../contexts/MediaContext';
import { getAllMedia } from '../hooks/APIHooks';

const List = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();
  setMedia(data);

  return (
    <BaseList
      dataArray={media}
      keyExtractor={(item, index) => index.toString()}
      renderRow={(item) => <ListItem
        navigation={props.navigation}
        singleMedia={item}
      />}
    />
  );
};

export default List;
