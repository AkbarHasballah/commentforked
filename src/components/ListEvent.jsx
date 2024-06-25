import { Grid, Typography } from '@mui/material';
import React from 'react';
import PostItem from './User/PostItem';

function ListEvent({ title, events }) {
  const getGridSize = (length) => {
    if (length === 1) return 12;
    if (length === 2) return 6;
    if (length === 3) return 4;
    if (length >= 4) return 3;
  };
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight="bold">{title}</Typography>
      </Grid>
      {events?.map((event, index) => (
        <Grid key={index} item xs={12} sm={getGridSize(events?.length)}>
          <PostItem post={event} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ListEvent;
