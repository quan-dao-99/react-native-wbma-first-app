import { FlatList } from 'react-native';
import ListItem from './ListItem';
import React from 'react';
import { PropTypes } from 'prop-types';

const List = ({data}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <ListItem singleMedia={item}/>}
    />
  );
};

List.propTypes = {
  data: PropTypes.array,
};

export default List;
