import React from 'react';
import { Box, Typography, Avatar, Grid } from '@mui/material';

const Header = ({ title, dateRange, authorName, authorRole, authorImage, timeAgo }) => (
  <Box padding={2} borderBottom={1} borderColor="grey.200">
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={9}>
        <Typography variant="h4" component="h1" sx={{ color: 'green', marginBottom: 1 }}>
          <b>{title}</b>
        </Typography>
        <Typography variant="subtitle1" marginBottom={1}>{dateRange}</Typography>
        <Box display="flex" alignItems="center">
          <Avatar src={authorImage} />  
          <Box marginLeft={1}>
            <Typography variant="subtitle2"><b>{authorName}</b></Typography>
            <Typography variant="body2">{authorRole}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={3} container justifyContent="flex-end">
        <Typography variant="body2">{timeAgo}</Typography>
      </Grid>
    </Grid>
  </Box>
);

export default Header;
