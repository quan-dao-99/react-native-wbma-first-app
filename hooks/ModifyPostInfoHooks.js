import React, { useContext, useState } from 'react';
import { AsyncStorage } from "react-native";
import { MediaContext } from "../contexts/MediaContext";
import validate from "validate.js";

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const constraints = {
  title: {
    length: {
      minimum: 3,
      message: '^Title must be at least 3 characters'
    }
  },
  description: {
    length: {
      minimum: 8,
      message: '^Description must be at least 8 characters'
    },
  },
};

const useModifyForm = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [media, setMedia] = useContext(MediaContext);
  const [valid, setValid] = useState(false);

  const handleTitleChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        title: text,
      })
    );
  };

  const handleDescriptionChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        description: text,
      })
    );
  };

  const validateField = (attr, value) => {
    try {
      const result = validate({[attr]: value}, constraints);
      let valid = undefined;
      if (result && result[attr]) {
        valid = result[attr][0];
      }
      setErrors((errors) => ({
        ...errors,
        [attr]: valid,
      }));
    } catch (e) {
      console.log(e);
    }

    validateUploadForm();
  };

  const validateUploadForm = () => {
    const check = validate(inputs, constraints);
    console.log('inputs', inputs);
    console.log(check);
    if (check === undefined) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleModify = async (navigation, fileId) => {
    try {
      const fd = new FormData();
      fd.append('title', inputs.title);
      fd.append('description', inputs.description ? inputs.description : '');

      const token = await AsyncStorage.getItem('userToken');
      console.log(inputs);

      const fetchOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(inputs),
      };

      const result = await fetch(`http://media.mw.metropolia.fi/wbma/media/${fileId}`, fetchOptions);
      const json = await result.json();
      console.log(json);
      if (json.message) {
        navigation.push('MyFiles');
      }
    } catch (e) {
      console.log('upload error', e);
    }
  };

  return {
    handleTitleChange,
    handleDescriptionChange,
    handleModify,
    validateField,
    validateUploadForm,
    errors,
    inputs,
    setInputs,
    valid,
  }
};

export { useModifyForm }
