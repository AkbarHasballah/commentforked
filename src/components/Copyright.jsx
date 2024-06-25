import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" to="/">
        Comment
        {' '}
      </Link>
      2024
    </Typography>
  );
}
