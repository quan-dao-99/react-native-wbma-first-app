import React, { Fragment, useState } from 'react';
import { Body, Button, Container, Content, Form, H1, Header, Left, Text, Title, Toast } from 'native-base';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from "../components/FormTextInput";
import { checkUsernameExist, login, signUp } from "../hooks/APIHooks";
import { useLoginForm } from "../hooks/LoginHooks";

const Login = (props) => {
  const [needSignUp, setNeedSignUp] = useState(false);
  const {
    inputs,
    errors,
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullNameChange,
    handleConfirmPasswordChange,
    validateForm,
    validateField,
    setErrors,
    resetErrors,
  } = useLoginForm();

  const loginAsync = async () => {
    const validation = validateForm();
    if (validation === true) {
      const user = await login(inputs);
      if (user) {
        await AsyncStorage.setItem('userToken', user.token);
        await AsyncStorage.setItem('user', JSON.stringify(user.user));
        props.navigation.navigate('App');
      }
    }
    setErrors(validation);
  };

  const signUpAsync = async () => {
    const validation = validateForm();
    if (validation === true) {
      // console.log(validation);
      await signUp(inputs);
      await loginAsync();
    }
    setErrors(validation);
  };

  const changeNeedSignUp = () => {
    setNeedSignUp(!needSignUp);
    resetErrors();
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
            <Body>
              <H1>Login</H1>
            </Body>
            <Form>
              <FormTextInput
                autoCapitalize='none'
                onChangeText={handleUsernameChange}
                placeholder={'Username'}
                errors={errors.username}
                onEndEditing={() => validateField('username', inputs.username)}
              />
              <FormTextInput
                autoCapitalize='none'
                secureTextEntry={true}
                placeholder={'Password'}
                onChangeText={handlePasswordChange}
                errors={errors.password}
                onEndEditing={() => validateField('password', inputs.password)}
              />
            </Form>
            <Button full onPress={loginAsync}>
              <Text>Log In</Text>
            </Button>
          </Fragment>
        )}
        {needSignUp && (
          <Fragment>
            <Body>
              <H1>Register</H1>
            </Body>
            <Form>
              <FormTextInput
                autoCapitalize='none'
                placeholder={'Username'}
                onChangeText={handleUsernameChange}
                onEndEditing={(evt) => {
                  checkRegisterUsernameExist(evt);
                  validateField('username', inputs.username);
                }}
                errors={errors.username}
              />
              <FormTextInput
                autoCapitalize='none'
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={handlePasswordChange}
                errors={errors.password}
                onEndEditing={() => validateField('password', inputs.password)}
              />
              <FormTextInput
                autoCapitalize='none'
                placeholder={'Confirm password'}
                secureTextEntry={true}
                onChangeText={handleConfirmPasswordChange}
                errors={errors.confirm_password}
                onEndEditing={() => validateField('confirm_password', inputs.confirm_password)}
              />
              <FormTextInput
                autoCapitalize='none'
                placeholder={'Email'}
                onChangeText={handleEmailChange}
                errors={errors.email}
                onEndEditing={() => validateField('email', inputs.email)}
              />
              <FormTextInput
                autoCapitalize='none'
                placeholder={'Full Name'}
                onChangeText={handleFullNameChange}
              />
            </Form>
            <Button full onPress={signUpAsync}>
              <Text>Sign Up</Text>
            </Button>
          </Fragment>
        )}
        <Button full dark onPress={changeNeedSignUp}>
          <Text>{needSignUp ? "Back to login?" : "Need an account?"}</Text>
        </Button>
      </Content>
    </Container>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
