import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Box } from '@mui/material';
import PostByCategory from './PostByCategory';

function ListPost({ title, posts }) {
  return (
    <Grid width="100%" container gap="15px">
      <Grid
        width="100%"
        flexDirection="row"
        display="flex"
        alignItems="center"
        justifyContent="space-between">
        <Typography
          style={{
            fontSize: 20,
            fontWeight: '700',
            wordWrap: 'break-word',
          }}>
          {title}
        </Typography>
      </Grid>
      <Box width="100%" display="flex" gap={2} flexDirection="column">
        {posts?.map((post) => (
          <PostByCategory
            key={post?.id}
            id={post?.id}
            title={post?.title}
            description={post?.description}
            owner={post?.owner}
            startDate={post?.startDate}
            endDate={post?.endDate}
            category={post?.category}
            postImage={post?.image}
            maxParticipants={post?.maxParticipants}
            participants={post?.participants}
            bookmarks={post?.bookmarks}
          />
        ))}
      </Box>
    </Grid>
  );
}

ListPost.propTypes = {
  title: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        profile: PropTypes.shape({
          name: PropTypes.string,
        }),
      }).isRequired,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      category: PropTypes.string.isRequired,
      image: PropTypes.string,
      maxParticipants: PropTypes.number,
      participants: PropTypes.arrayOf(
        PropTypes.shape({
          userId: PropTypes.string,
        }),
      ),
      bookmarks: PropTypes.arrayOf(
        PropTypes.shape({
          userId: PropTypes.string,
          postId: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
};

export default ListPost;
