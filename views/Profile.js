import React from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { getLoggedInUserInfo } from "../hooks/APIHooks";

const Profile = (props) => {
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };

  const [user] = getLoggedInUserInfo();

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Text>Username: {user.username}</Text>
      {(user.full_name === null) ? <Text>Full Name: null (Quan Dao)</Text> : <Text>Full Name: {user.full_name}</Text>}
      <Text>Email: {user.email}</Text>
      <Button title="Logout!" onPress={signOutAsync}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
