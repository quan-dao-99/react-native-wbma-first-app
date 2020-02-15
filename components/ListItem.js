import { Body, Button, Icon, Left, ListItem as BaseListItem, Right, Text, Thumbnail } from 'native-base';
import React from "react";
import { PropTypes } from 'prop-types';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const ListItem = (props) => {
  const singleMedia = props.singleMedia;
  // const [media, setMedia] = useContext(MediaContext);

  // const deleteFileAndRefresh = async (fileId) => {
  //   const deleteResponse = await deleteFile(fileId);
  //   if (deleteResponse.message.includes('delete')) {
  //     const allMediaResponse = await fetch(apiUrl + 'media/all');
  //     const allMediaJson = await allMediaResponse.json();
  //     const result = await Promise.all(allMediaJson.files.map(async (item) => {
  //       const response = await fetch(apiUrl + 'media/' + item.file_id);
  //       return await response.json();
  //     }));
  //     setMedia(result);
  //   }
  // };

  return (
    <React.Fragment>
      <BaseListItem thumbnail>
        <Left>
          <Thumbnail square source={{uri: apiUrl + 'uploads/' + singleMedia.thumbnails.w160}}/>
        </Left>
        <Body>
          <Text>{singleMedia.title}</Text>
          <Text>{singleMedia.description === 'undefined' ? '' : singleMedia.description}</Text>
        </Body>
        <Right>
          <Button info onPress={() => {
            props.navigation.push('Single', {
              item: singleMedia,
            });
          }}>
            <Icon name='eye'/>
          </Button>
          {props.mode !== 'all' && (
            <>
              <Button info onPress={() => {
                props.navigation.push('ModifyPostInfo', {
                  itemId: singleMedia.file_id,
                })
              }}>
                <Icon name='create'/>
              </Button>
              <Button danger onPress={() => {
                props.delete(singleMedia.file_id);
              }}>
                <Icon name='close'/>
              </Button>
            </>)}
        </Right>
      </BaseListItem>
    </React.Fragment>
  )
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
