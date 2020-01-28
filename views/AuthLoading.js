import React, { useEffect } from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar } from 'react-native';
import { View } from 'native-base';
import PropTypes from 'prop-types';

const bootstrapAsync = async (props) => {
  async function getToken() {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log('token', userToken);
    props.navigation.navigate(userToken ? 'App' : 'Auth');
  }

  useEffect(() => {
    getToken();
  }, []);
};

const AuthLoading = (props) => {
  bootstrapAsync(props);
  return (
    <View>
      <ActivityIndicator/>
      <StatusBar barStyle="dark-content"/>
    </View>
  );
};

AuthLoading.propTypes = {
  navigation: PropTypes.object,
};

export default AuthLoading;
