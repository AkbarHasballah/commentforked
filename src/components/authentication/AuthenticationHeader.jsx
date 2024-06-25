import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function AuthenticationHeader({
  title,
  subtitle,
  textAlign,
  color,
}) {
  return (
    <Box width="100%" textAlign={textAlign}>
      <Typography component="h2" variant="h4" color={color} fontWeight="bold">
        {title}
      </Typography>
      <Typography
        component="h3"
        variant="h5"
        color={color}
        fontWeight="regular"
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

AuthenticationHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  textAlign: PropTypes.string,
  color: PropTypes.string,
};

AuthenticationHeader.defaultProps = {
  textAlign: 'center',
  color: 'softwhite',
};
