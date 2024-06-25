import { Grid, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

function ListHomepage({ title, children }) {
  return (
    <Grid width="100%" container paddingX="60px" gap="20px">
      <Grid
        width="100%"
        flexDirection="row"
        display="flex"
        alignItems="center"
        justifyContent="space-between">
        <Typography
          style={{
            fontSize: 32,
            fontWeight: '700',
            wordWrap: 'break-word',
          }}>
          {title}
        </Typography>
        <Typography component={Link} to="/trends">
          Lihat Semua
        </Typography>
      </Grid>
      <Box width="100%">{children}</Box>
    </Grid>
  );
}

ListHomepage.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ListHomepage;
