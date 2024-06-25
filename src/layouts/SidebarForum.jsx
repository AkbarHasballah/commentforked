import { Grid, useMediaQuery } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';

function SidebarForum({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid
      xs={isMobile ? 12 : 3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '25px',
      }}
      gap="15px"
    >
      {children}
    </Grid>
  );
}

SidebarForum.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarForum;
