import React from 'react';
import { Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Content = ({ imageSrc, contentText, registered }) => (
  <Box padding={2}>
    <Box
      component="img"
      src={imageSrc}
      alt="Post content image"
      sx={{ width: '100%', borderRadius: 2 }}
    />
    <Typography variant="body1" marginTop={2}>{contentText}</Typography>
    <Box display="flex" alignItems="center" marginTop={2}>
      <PersonIcon fontSize="large" />
      <Typography variant="body1" marginLeft={1}>
        {registered.current} / {registered.max} Terdaftar
      </Typography>
    </Box>
  </Box>
);

export default Content;
