import React, { useState } from 'react';
import FormTextInput from "../components/FormTextInput";
import { Dimensions, Image } from "react-native";
import { Button, Content, Form, Text } from 'native-base';
import { useUploadForm } from "../hooks/UploadHooks";
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

const deviceHeight = Dimensions.get('window').height;

const getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};

const Upload = (props) => {
  getPermissionAsync();

  const [image, setImage] = useState(null);
  const {
    handleDescriptionChange,
    handleTitleChange,
    handleUpload,
    validateField,
    validateUploadForm,
    errors,
    inputs,
    setInputs,
    valid,
  } = useUploadForm();

  const clearForm = () => {
    setImage(null);
    setInputs({});
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Content>
      {image && <Image
        source={{uri: image}}
        style={{width: '100%', height: deviceHeight / 3, flex: 1, resizeMode: 'contain'}}/>}
      <Form>
        <FormTextInput
          autoCapitalize='none'
          placeholder={'Title'}
          onChangeText={handleTitleChange}
          errors={errors.title}
          onEndEditing={() => validateField('title', inputs.title)}
          value={inputs.title}
        />
        <FormTextInput
          autoCapitalize='none'
          placeholder={'Description'}
          onChangeText={handleDescriptionChange}
          errors={errors.description}
          onEndEditing={() => validateField('description', inputs.description)}
          value={inputs.description}
        />
      </Form>
      <Button full onPress={pickImage}>
        <Text>Select an image</Text>
      </Button>
      <Button full dark onPress={clearForm}>
        <Text>Clear</Text>
      </Button>
      <Button full disabled={image === null || !valid} onPress={() => {
        handleUpload(image, props.navigation);
      }}>
        <Text>Upload</Text>
      </Button>
    </Content>
  )
};

export default Upload;
