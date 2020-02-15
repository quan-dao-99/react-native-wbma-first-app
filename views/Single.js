import React from 'react';
import { Image } from 'react-native';
import { Body, Card, CardItem, Container, H1, Icon, Text } from 'native-base';
import { Video } from 'expo-av';
import { getUserInfo } from "../hooks/APIHooks";

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = (props) => {
  const {navigation} = props;
  const singleMedia = navigation.getParam('item', {});
  const [uploadUser] = getUserInfo(singleMedia.user_id);

  return (
    <Container>
      <Card>
        <CardItem bordered>
          {singleMedia.media_type === 'image' ?
            <Image
              source={{uri: mediaUrl + singleMedia.filename}}
              style={{width: null, height: 400, flex: 1, marginLeft: 20, marginRight: 20, resizeMode: 'contain'}}
            /> :
            <Video
              source={{uri: mediaUrl + singleMedia.filename}}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              shouldPlay
              isLooping
              useNativeControls
              style={{width: null, height: 400, flex: 1, marginLeft: 20, marginRight: 20}}
              posterSource={{uri: mediaUrl + singleMedia.thumbnails.w160}}
            />}
        </CardItem>
        <CardItem>
          <Icon name="image"/>
          <Body>
            <H1>{uploadUser.username}</H1>
            <Text>{singleMedia.title}</Text>
            <Text>{singleMedia.description === 'undefined' ? '' : singleMedia.description}</Text>
          </Body>
        </CardItem>
      </Card>
    </Container>
  );
};

export default Single;
