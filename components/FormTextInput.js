import React from 'react';
import { Input, Item } from 'native-base';
import PropTypes from 'prop-types';


const FormTextInput = (props) => {
  const {...otherProps} = props;
  return (
    <Item inlineLabel>
      <Input {...otherProps}/>
    </Item>
  );
};

FormTextInput.propTypes = {
  style: PropTypes.object,
};

export default FormTextInput;
