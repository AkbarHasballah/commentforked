import { Button } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function ButtonAuthentication(props) {
  const {
    text,
    styleType,
    variant,
    callback,
  } = props;
  return (
    <Button
      variant={variant}
      color={styleType}
      className="max-md:my-1 text-white"
      onClick={() => callback()}
    >
      {text}
    </Button>
  );
}

ButtonAuthentication.propTypes = {
  text: PropTypes.string.isRequired,
  styleType: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'info',
  ]),
  variant: PropTypes.oneOf(['contained', 'outlined']),
  callback: PropTypes.func,
};

ButtonAuthentication.defaultProps = {
  variant: 'contained',
  styleType: 'primary',
  callback: () => {},
};
export default ButtonAuthentication;
