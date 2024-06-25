import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUserPlus } from 'react-icons/fa6';
import parse from 'html-react-parser';
import { asyncAddBookmarkPost, asyncRemoveBookmarkPost } from '../../states/posts/thunk';
import ProfileOwner from '../ProfileOwner';
import ownerShape from '../../types/Owner';
import { formatDate, postedAt } from '../../utils/date';
import Bookmark from './Bookmark';
import { URL_APP_FILE } from '../../utils/api';

function Details({ description }) {
  return (
    <Box mt={2}>
      <Typography
        variant="body1"
        color="textSecondary"
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {description && parse(description)}
      </Typography>
    </Box>
  );
}

function CardPost(props) {
  const {
    authUser,
    id,
    title,
    owner,
    category,
    description,
    image,
    startDate,
    endDate,
    createdAt,
    totalParticipants,
    maxParticipant,
    bookmarks,
  } = props;

  const dispatch = useDispatch();
  const isBookmarkPost = bookmarks?.some(
    (postMark) => postMark?.userId === authUser?.id,
  );

  const handleBookmark = async (e) => {
    e.preventDefault();
    if (isBookmarkPost) {
      await dispatch(asyncRemoveBookmarkPost({ postId: id, userId: authUser.id }));
    } else {
      await dispatch(asyncAddBookmarkPost(id));
    }
  };

  return (
    <Link to={`/posts/${id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
        <CardContent>
          <Grid
            display="flex"
            flexDirection="row"
            gap="20px"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color="textPrimary"
              alignSelf="start"
            >
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {postedAt(createdAt)}
            </Typography>
          </Grid>

          {category === 'Event' && (
            <Typography
              variant="body2"
              color="textSecondary"
              mt={1.5}
              alignSelf="start"
            >
              {formatDate(startDate)} - {formatDate(endDate)}
            </Typography>
          )}
          <ProfileOwner
            name={owner?.profile?.name}
            headTitle={owner?.profile?.headTitle}
            avatar={owner?.profile?.photo}
          />

          <Details description={description} />
          {image && (
            <Box
              component="img"
              loading="lazy"
              src={URL_APP_FILE + image}
              alt={title}
              width="100%"
              height="350px"
              mt={2}
              sx={{ objectFit: 'cover' }}
            />
          )}
          <Box
            display="flex"
            gap={5}
            pr={{ xs: 5, md: 20 }}
            mt={2}
            flexWrap={{ xs: 'wrap', md: 'nowrap' }}
            color="textSecondary"
          >
            {category === 'Event' && (
              <Box display="flex" gap={2} alignItems="center">
                <FaUserPlus />
                <Typography variant="body2" alignSelf="center">
                  {totalParticipants} / {maxParticipant} Participant
                </Typography>
              </Box>
            )}
            <Bookmark onClick={handleBookmark} isBookmark={isBookmarkPost} />
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}

Details.propTypes = {
  description: PropTypes.string.isRequired,
};

CardPost.propTypes = {
  authUser: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalParticipants: PropTypes.number.isRequired,
  maxParticipant: PropTypes.number.isRequired,
  bookmarks: PropTypes.array.isRequired,
};

CardPost.defaultProps = {
  image: null,
};

export default CardPost;
