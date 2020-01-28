import React from 'react';
import { Image } from 'react-native';
import { Body, Card, CardItem, Container, Icon, Text } from 'native-base';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = (props) => {
  const {navigation} = props;
  const singleMedia = navigation.getParam('item', {});

  return (
    <Container>
      <Card>
        <CardItem bordered>
          <Image
            source={{uri: mediaUrl + singleMedia.filename}}
            style={{width: null, height: 400, flex: 1, marginLeft: 20, marginRight: 20, resizeMode: 'contain'}}
          />
        </CardItem>
        <CardItem>
          <Icon name="image"/>
          <Body>
            <Text>{singleMedia.title}</Text>
            <Text>{singleMedia.description}</Text>
          </Body>
        </CardItem>
      </Card>
    </Container>
  );
};

export default Single;
