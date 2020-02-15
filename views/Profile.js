import React from 'react';
import { AsyncStorage, Image } from 'react-native';
import { Body, Button, Card, CardItem, Container, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { getLoggedInUserInfo, getUserAvatar } from "../hooks/APIHooks";

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = (props) => {
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };

  const showMyFiles = () => {
    props.navigation.push('MyFiles');
  };

  const [user] = getLoggedInUserInfo();
  const [avatar] = getUserAvatar();

  return (
    <Container>
      <Card>
        <CardItem bordered>
          <Icon name='person'/>
          <Text>Username: {user.username}</Text>
        </CardItem>
        <CardItem bordered>
          <Body>
            <CardItem>
              <Image source={{uri: mediaUrl + avatar}}
                     style={{width: 400, height: 400, flex: 1, resizeMode: 'contain'}}/>
            </CardItem>
            {(user.full_name === null) ? <Text>Full Name: null (Quan Dao)</Text> :
              <Text>Full Name: {user.full_name}</Text>}
            <Text>Email: {user.email}</Text>
          </Body>
        </CardItem>
        <Button full info onPress={showMyFiles}>
          <Text>Show my files</Text>
        </Button>
        <Button full danger onPress={signOutAsync}>
          <Text>Logout</Text>
        </Button>
      </Card>
    </Container>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
