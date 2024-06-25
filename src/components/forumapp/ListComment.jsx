import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import commentShape from '../../types/Comment';

export default function ListComment({ comments }) {
  return (
    <Grid width="100%" container gap="15px">
      <Grid
        width="100%"
        flexDirection="row"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          style={{
            fontSize: 20,
            fontWeight: '700',
            wordWrap: 'break-word',
          }}
        >
          Comment
        </Typography>
      </Grid>
      <Box width="100%" display="flex" flexDirection="column" gap="15px">
        {comments?.map((comment) => <CommentItem {...comment} />)}
      </Box>
    </Grid>
  );
}

ListComment.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
};
