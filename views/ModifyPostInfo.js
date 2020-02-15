import React from 'react';
import FormTextInput from "../components/FormTextInput";
import { Dimensions } from "react-native";
import { Button, Content, Form, Text } from 'native-base';
import { useModifyForm } from "../hooks/ModifyPostInfoHooks";

const deviceHeight = Dimensions.get('window').height;

const ModifyPostInfo = (props) => {
  const {
    handleDescriptionChange,
    handleTitleChange,
    handleModify,
    validateField,
    validateUploadForm,
    errors,
    inputs,
    setInputs,
    valid,
  } = useModifyForm();

  const fileId = props.navigation.getParam('itemId', undefined);

  const clearForm = () => {
    setInputs({});
  };

  return (
    <Content>
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
      <Button full dark onPress={clearForm}>
        <Text>Clear</Text>
      </Button>
      <Button full disabled={!valid} onPress={() => {
        handleModify(props.navigation, fileId);
      }}>
        <Text>Save</Text>
      </Button>
    </Content>
  )
};

export default ModifyPostInfo;
