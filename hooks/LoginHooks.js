import { useState } from 'react';

const useLoginForm = () => {
  const [loginInputs, setInputs] = useState({});
  const handleLoginUsernameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        username: text,
      }));
  };
  const handleLoginPasswordChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        password: text,
      }));
  };
  return {
    handleLoginUsernameChange,
    handleLoginPasswordChange,
    loginInputs,
  };
};

const useSignUpForm = () => {
  const [signUpInputs, setInputs] = useState({});
  const handleSignUpUsernameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        username: text,
      }));
  };
  const handleSignUpPasswordChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        password: text,
      }));
  };
  const handleSignUpEmailChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        email: text,
      }));
  };
  const handleSignUpFullNameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        full_name: text,
      }));
  };
  return {
    handleSignUpUsernameChange,
    handleSignUpPasswordChange,
    handleSignUpEmailChange,
    handleSignUpFullNameChange,
    signUpInputs,
  };
};

export { useLoginForm, useSignUpForm };
