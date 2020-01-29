import { useState } from 'react';
import validate from "validate.js";

const defaultErrors = {
  username: undefined,
  email: undefined,
  password: undefined,
  confirm_password: undefined,
};

const constraints = {
  username: {
    presence: {
      allowEmpty: false,
    },
    length: {
      minimum: 3,
      message: '^Your username must be at least 3 characters'
    }
  },
  password: {
    presence: {
      allowEmpty: false,
    },
    length: {
      minimum: 5,
      message: '^Your password must be at least 5 characters'
    }
  },
  confirm_password: {
    presence: {
      allowEmpty: false,
    },
    equality: "password",
  },
  email: {
    presence: {
      allowEmpty: false,
    },
    email: {
      message: '^Please enter a valid email address'
    }
  },
};

const useLoginForm = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState(defaultErrors);

  const handleUsernameChange = (text) => {
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
  const handleConfirmPasswordChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        confirm_password: text,
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
  const validateField = (attr, value) => {
    const result = validate({[attr]: value}, constraints);
    let valid = undefined;
    console.log(result);
    if (result[attr]) {
      valid = result[attr][0];
    }
    setErrors((errors) => ({
      ...errors,
      [attr]: valid,
    }));
  };
  const validateForm = () => {
    const check = validate(inputs, constraints);
    if (!check) return true;
    return check;
  };
  const validateLoginForm = () => {
    const check = validate(inputs, constraints);
    if (!check.username && !check.password) return true;
    return check;
  };
  const resetErrors = () => {
    setErrors(defaultErrors);
  };
  return {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullNameChange,
    handleConfirmPasswordChange,
    validateForm,
    validateLoginForm,
    validateField,
    inputs,
    errors,
    setErrors,
    resetErrors,
  };
};

export { useLoginForm };
