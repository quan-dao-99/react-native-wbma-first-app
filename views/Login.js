import React, { Fragment, useState } from 'react';
import { Body, Button, Container, Content, Form, H1, Header, Left, Text, Title } from 'native-base';
import { AsyncStorage } from 'react-native';
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
    <Container>
      <Header>
        <Left/>
        <Left/>
        <Body>
          <Title>MyApp</Title>
        </Body>
      </Header>
      <Content>
        <Fragment>
          <H1>Login</H1>
          <Form>
            <FormTextInput
              autoCapitalize='none'
              onChangeText={handleUsernameChange}
              label={'Username'}
            />
            <FormTextInput
              autoCapitalize='none'
              secureTextEntry={true}
              label={'Password'}
              onChangeText={handlePasswordChange}
            />
          </Form>
          <Button info onPress={loginAsync}>
            <Text>Log In</Text>
          </Button>
        </Fragment>
        <Fragment>
          <H1>Register</H1>
          <Form>
            <FormTextInput
              autoCapitalize='none'
              label={'Username'}
              onChangeText={handleUsernameChange}
            />
            <FormTextInput
              autoCapitalize='none'
              label={'Password'}
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
            />
            <FormTextInput
              autoCapitalize='none'
              label={'Email'}
              onChangeText={handleEmailChange}
            />
            <FormTextInput
              autoCapitalize='none'
              label={'Full Name'}
              onChangeText={handleFullNameChange}
            />
          </Form>
          <Button info onPress={signUpAsync}>
            <Text>Sign Up</Text>
          </Button>
        </Fragment>
        {/*<Button info onPress={changeNeedSignUp}>*/}
        {/*  <Text>{needSignUp ? "Back to login?" : "Need to sign up?"}</Text>*/}
        {/*</Button>*/}
      </Content>
    </Container>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
