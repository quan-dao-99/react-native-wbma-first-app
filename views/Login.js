import React from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View, } from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from "../components/FormTextInput";
import { login, signUp } from "../hooks/APIHooks";
import { useLoginForm, useSignUpForm } from "../hooks/LoginHooks";

const Login = (props) => {
  const {loginInputs, handleLoginUsernameChange, handleLoginPasswordChange} = useLoginForm();
  const {signUpInputs, handleSignUpUsernameChange, handleSignUpPasswordChange, handleSignUpEmailChange, handleSignUpFullNameChange} = useSignUpForm();
  const loginAsync = async () => {
    const user = await login(loginInputs);

    await AsyncStorage.setItem('userToken', user.token);
    await AsyncStorage.setItem('user', JSON.stringify(user.user));
    props.navigation.navigate('App');
  };

  const signUpAsync = async () => {
    await signUp(signUpInputs);
    const signedUpUser = {
      username: signUpInputs.username,
      password: signUpInputs.password,
    };
    const user = await login(signedUpUser);
    console.log(user);

    await AsyncStorage.setItem('userToken', user.token);
    await AsyncStorage.setItem('user', JSON.stringify(user.user));
    props.navigation.navigate('App');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Login</Text>
        <View style={styles.form}>
          <FormTextInput
            autoCapitalize='none'
            placeholder='Username'
            onChangeText={handleLoginUsernameChange}
          />
          <FormTextInput
            autoCapitalize='none'
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={handleLoginPasswordChange}
          />
          <Button title="Log in!" onPress={loginAsync}/>
        </View>
      </View>
      <View>
        <Text>Register</Text>
        <View style={styles.form}>
          <FormTextInput
            autoCapitalize='none'
            placeholder='Username'
            onChangeText={handleSignUpUsernameChange}
          />
          <FormTextInput
            autoCapitalize='none'
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={handleSignUpPasswordChange}
          />
          <FormTextInput
            autoCapitalize='none'
            placeholder='Email'
            onChangeText={handleSignUpEmailChange}
          />
          <FormTextInput
            autoCapitalize='none'
            placeholder='Full Name'
            onChangeText={handleSignUpFullNameChange}
          />
          <Button title="Sign Up!" onPress={signUpAsync}/>
        </View>
      </View>
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
      flexDirection: 'row',
    },
  })
;

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
