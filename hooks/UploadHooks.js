import React, { useContext, useState } from 'react';
import { AsyncStorage } from "react-native";
import { MediaContext } from "../contexts/MediaContext";
import validate from "validate.js";

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const defaultErrors = {
  title: undefined,
};

const constraints = {
  title: {
    presence: {
      allowEmpty: false,
    },
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

const useUploadForm = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState(defaultErrors);
  const [media, setMedia] = useContext(MediaContext);
  const [valid, setValid] = useState(false);

  const handleTitleChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        title: text,
      }));
  };

  const handleDescriptionChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        description: text,
      }));
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
    if (check === undefined) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleUpload = async (file, navigation) => {
    try {
      const filename = file.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      if (type === 'image/jpg') {
        type = 'image/jpeg';
      }

      const fd = new FormData();
      fd.append('title', inputs.title);
      fd.append('description', inputs.description ? inputs.description : '');
      fd.append('file', {uri: file, name: filename, type});

      const token = await AsyncStorage.getItem('userToken');

      const fetchOptions = {
        method: 'POST',
        headers: {
          'x-access-token': token,
        },
        body: fd,
      };

      const result = await fetch('http://media.mw.metropolia.fi/wbma/media/', fetchOptions);
      const json = await result.json();
      if (json.file_id) {
        const response = await fetch(apiUrl + 'media/all');
        const json = await response.json();
        const result = await Promise.all(json.files.map(async (item) => {
          const response = await fetch(apiUrl + 'media/' + item.file_id);
          return await response.json();
        }));
        setMedia(result);
        navigation.push('Home');
      }
    } catch (e) {
      console.log('upload error', e);
    }
  };

  return {
    handleTitleChange,
    handleDescriptionChange,
    handleUpload,
    validateField,
    validateUploadForm,
    errors,
    inputs,
    setInputs,
    valid,
  }
};

export { useUploadForm }
