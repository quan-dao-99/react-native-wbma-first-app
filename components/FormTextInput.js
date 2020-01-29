import React from 'react';
import { Badge, Content, Input, Item, Text } from 'native-base';
import PropTypes from 'prop-types';

const FormTextInput = (props) => {
  const {errors, ...otherProps} = props;
  console.log('errors', errors);
  return (
    <Content>
      <Item>
        <Input {...otherProps}/>
      </Item>
      {(errors && (
        <Badge>
          <Text>{errors}</Text>
        </Badge>))}
    </Content>
  );
};

FormTextInput.propTypes = {
  style: PropTypes.object,
};

export default FormTextInput;
