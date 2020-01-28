import React from 'react';
import { Input, Item, Label } from 'native-base';
import PropTypes from 'prop-types';


const FormTextInput = (props) => {
  const {label, ...otherProps} = props;
  return (
    <Item inlineLabel>
      <Label>{label}</Label>
      <Input {...otherProps}/>
    </Item>
  );
};

FormTextInput.propTypes = {
  style: PropTypes.object,
};

export default FormTextInput;
