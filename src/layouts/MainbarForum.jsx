import { Grid, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function MainbarForum({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid
      xs={isMobile ? 12 : 9}
      display="flex"
      flexDirection="column"
      gap="15px"
      width="100%"
    >
      {children}
    </Grid>
  );
}

MainbarForum.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainbarForum;
