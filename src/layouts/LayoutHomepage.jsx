import { Grid } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function LayoutHomepage({ children }) {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        bgcolor: 'softwhite',
        height: 'auto', // atau sesuaikan dengan kebutuhan
        width: '100%',
      }}
      paddingBottom="60px"
      gap="60px"
    >
      {children}
    </Grid>
  );
}

LayoutHomepage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutHomepage;
