import { List as BaseList } from 'native-base';
import ListItem from './ListItem';
import React from 'react';

const List = (props) => {
  return (
    <BaseList
      dataArray={props.media}
      keyExtractor={(item, index) => index.toString()}
      renderRow={(item) => <ListItem
        navigation={props.navigation}
        singleMedia={item}
        delete={props.delete}
        mode={props.mode}
      />}
    />
  );
};

export default List;
