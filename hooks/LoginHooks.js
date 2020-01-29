import { useState } from 'react';
import validate from "validate.js";

const constraints = {
  username: {
    presence: {
      message: '^Please enter a username'
    },
    length: {
      minimum: 3,
      message: '^Your username must be at least 3 characters'
    }
  },
  password: {
    presence: {
      message: '^Please enter a password'
    },
    length: {
      minimum: 5,
      message: '^Your password must be at least 5 characters'
    }
  },
  email: {
    presence: {
      message: '^Please enter an email address'
    },
    email: {
      message: '^Please enter a valid email address'
    }
  },
  full_name: {
    length: {
      minimum: 3,
      message: '^Your username must be at least 3 characters'
    }
  }
};

const useLoginForm = () => {
  const [inputs, setInputs] = useState({});
  const handleUsernameChange = (text) => {
    const check = validate({username: text}, constraints);
    console.log(check.username ? 'invalid' : 'valid');

    setInputs((inputs) =>
      ({
        ...inputs,
        username: text,
      }));
  };
  const handlePasswordChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        password: text,
      }));
  };
  const handleEmailChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        email: text,
      }));
  };
  const handleFullNameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        full_name: text,
      }));
  };
  return {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullNameChange,
    inputs,
  };
};

export { useLoginForm };
