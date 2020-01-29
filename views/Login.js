import React, { Fragment, useState } from 'react';
import { Body, Button, Container, Content, Form, H1, Header, Left, Text, Title, Toast } from 'native-base';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from "../components/FormTextInput";
import { checkUsernameExist, login, signUp } from "../hooks/APIHooks";
import { useLoginForm } from "../hooks/LoginHooks";

const Login = (props) => {
  const [error, setError] = useState('');
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

  const checkRegisterUsernameExist = async (evt) => {
    const username = evt.nativeEvent.text;
    const available = await checkUsernameExist(username);
    if (!available) {
      Toast.show({
        text: 'Username already exists!',
        buttonText: 'Okay'
      })
    }
  };

  return (
    <Container>
      <Header>
        <Left/>
        <Left/>
        <Body>
          <Title>MyApp</Title>
        </Body>
      </Header>
      <Content>
        {!needSignUp && (
          <Fragment>
            <H1>Login</H1>
            <Form>
              <FormTextInput
                autoCapitalize='none'
                onChangeText={handleUsernameChange}
                placeholder={'Username'}
              />
              <FormTextInput
                autoCapitalize='none'
                secureTextEntry={true}
                placeholder={'Password'}
                onChangeText={handlePasswordChange}
              />
            </Form>
            <Button full info onPress={loginAsync}>
              <Text>Log In</Text>
            </Button>
          </Fragment>
        )}
        {needSignUp && (
          <Fragment>
            <H1>Register</H1>
            <Form>
              <FormTextInput
                autoCapitalize='none'
                placeholder={'Username'}
                onChangeText={handleUsernameChange}
                onEndEditing={checkRegisterUsernameExist}
              />
              <FormTextInput
                autoCapitalize='none'
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={handlePasswordChange}
              />
              <FormTextInput
                autoCapitalize='none'
                placeholder={'Email'}
                onChangeText={handleEmailChange}
              />
              <FormTextInput
                autoCapitalize='none'
                placeholder={'Full Name'}
                onChangeText={handleFullNameChange}
              />
            </Form>
            <Button full info onPress={signUpAsync}>
              <Text>Sign Up</Text>
            </Button>
          </Fragment>
        )}
        <Button full info onPress={changeNeedSignUp}>
          <Text>{needSignUp ? "Back to login?" : "Need to sign up?"}</Text>
        </Button>
      </Content>
    </Container>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
