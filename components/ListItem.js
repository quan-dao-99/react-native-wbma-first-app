import { Body, Button, Left, ListItem as BaseListItem, Right, Text, Thumbnail } from 'native-base';
import React from "react";
import { PropTypes } from 'prop-types';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = (props) => {
  const singleMedia = props.singleMedia;
  return (
    <React.Fragment>
      <BaseListItem thumbnail>
        <Left>
          <Thumbnail square source={{uri: mediaUrl + singleMedia.thumbnails.w160}}/>
        </Left>
        <Body>
          <Text>{singleMedia.title}</Text>
          <Text>{singleMedia.description}</Text>
        </Body>
        <Right>
          <Button info onPress={() => {
            props.navigation.push('Single', {
              item: singleMedia,
            });
          }}>
            <Text>View</Text>
          </Button>
        </Right>
      </BaseListItem>
    </React.Fragment>
  )
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
