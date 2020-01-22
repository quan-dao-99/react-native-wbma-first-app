import React, { Fragment, useState } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View, } from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from "../components/FormTextInput";
import { login, signUp } from "../hooks/APIHooks";
import { useLoginForm } from "../hooks/LoginHooks";

const Login = (props) => {
  const [needSignUp, setNeedSignUp] = useState(false);
  const {inputs, handleUsernameChange, handlePasswordChange, handleEmailChange, handleFullNameChange} = useLoginForm();
  const loginAsync = async () => {
    const user = await login(inputs);

    await AsyncStorage.setItem('userToken', user.token);
    await AsyncStorage.setItem('user', JSON.stringify(user.user));
    props.navigation.navigate('App');
  };

  const signUpAsync = async () => {
    await signUp(inputs);
    await loginAsync();
  };

  const changeNeedSignUp = () => {
    setNeedSignUp(!needSignUp);
  };

  return (
    <View style={styles.container}>
      {!needSignUp && (
        <Fragment>
          <View style={styles.form}>
            <Text>Login</Text>
            <View style={styles.form}>
              <FormTextInput
                autoCapitalize='none'
                placeholder='Username'
                onChangeText={handleUsernameChange}
              />
              <FormTextInput
                autoCapitalize='none'
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={handlePasswordChange}
              />
              <Button title="Log in!" onPress={loginAsync}/>
            </View>
          </View>
        </Fragment>
      )}
      {needSignUp && (
        <Fragment>
          <View>
            <Text>Register</Text>
            <View style={styles.form}>
              <FormTextInput
                autoCapitalize='none'
                placeholder='Username'
                onChangeText={handleUsernameChange}
              />
              <FormTextInput
                autoCapitalize='none'
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={handlePasswordChange}
              />
              <FormTextInput
                autoCapitalize='none'
                placeholder='Email'
                onChangeText={handleEmailChange}
              />
              <FormTextInput
                autoCapitalize='none'
                placeholder='Full Name'
                onChangeText={handleFullNameChange}
              />
              <Button title="Sign Up!" onPress={signUpAsync}/>
            </View>
          </View>
        </Fragment>
      )}
      <Button title={needSignUp ? "Login?" : "Need to sign up?"} onPress={changeNeedSignUp}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      marginBottom: 30,
    }
  })
;

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
