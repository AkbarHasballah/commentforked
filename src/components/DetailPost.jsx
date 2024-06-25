import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, Grid, Card } from '@mui/material';
import { FaUserPlus } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import parse from 'html-react-parser';
import useExpand from '../hooks/useExpand';
import ownerShape from '../types/Owner';
import { formatDate, postedAt } from '../utils/date';
import ButtonMenu from './forumapp/ButtonMenu';
import Bookmark from './forumapp/Bookmark';
import {
  asyncAddBookmarkPostDetail,
  asyncDeletePost,
  asyncEditPost,
  asyncJoinEvent,
  asyncLeaveEvent,
  asyncReceivePostDetail,
  asyncRemoveBookmarkPostDetail,
} from '../states/postDetail/thunk';
import { URL_APP_FILE } from '../utils/api';

function DetailPost(props) {
  const {
    id,
    authUser,
    category,
    title,
    image,
    owner,
    startDate,
    endDate,
    createdAt,
    description,
    maxParticipants,
    participants,
    bookmarks,
  } = props;

  const [isExpanded, handleExpand] = useExpand(false);
  const navigate = useNavigate();
  const location = useLocation();
  const paths = location.pathname.split('/');
  const lastPath = paths[paths.length - 1];

  const [modalOpen, { open, close }] = useDisclosure(false);
  const [actionType, setActionType] = useState('');
  const dispatch = useDispatch();

  const isEventFull = participants?.length >= maxParticipants;
  const isEventEnded = new Date(endDate) < new Date();
  const isUserParticipating = participants?.some(
    (participant) => participant?.userId === authUser?.id,
  );
  const isBookmarkPost = bookmarks?.some(
    (postMark) => postMark?.userId === authUser?.id,
  );

  const handleEditPost = async (data) => {
    await dispatch(asyncEditPost(data));
  };

  const handleDeletePost = async () => {
    const { error } = await dispatch(asyncDeletePost(id));
    if (!error) {
      navigate('/');
    }
  };

  const handleBookmark = async (e) => {
    e.preventDefault();
    if (isBookmarkPost) {
      await dispatch(asyncRemoveBookmarkPostDetail(id));
    } else {
      await dispatch(asyncAddBookmarkPostDetail(id));
    }
  };

  const handleJoinClick = () => {
    setActionType('join');
    open();
  };

  const handleLeaveClick = () => {
    setActionType('leave');
    open();
  };

  const handleConfirm = async () => {
    if (actionType === 'join') {
      const { error } = await dispatch(asyncJoinEvent(id));
      if (!error) {
        dispatch(asyncReceivePostDetail(id));
      }
    } else if (actionType === 'leave') {
      const { error } = await dispatch(asyncLeaveEvent(id));
      if (!error) {
        dispatch(asyncReceivePostDetail(id));
      }
    }
    close();
  };

  return (
    <Grid gap={2} display="flex" flexDirection="column">
      {lastPath === 'absent' ? (
        <Typography
          fontWeight="bold"
          color="softbrown"
          textTransform="capitalize">
          Absent Event
        </Typography>
      ) : (
        <Typography
          fontWeight="bold"
          color="softbrown"
          textTransform="capitalize">
          {category}
        </Typography>
      )}

      <Box
        display="flex"
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        gap={2}
        color="textPrimary">
        <Typography variant="h4" fontWeight="bold" flex={1}>
          {title}
        </Typography>
        {owner?.id !== authUser?.id && authUser && (
          <Bookmark isBookmark={isBookmarkPost} onClick={handleBookmark} />
        )}

        {owner?.id === authUser?.id && (
          <ButtonMenu
            event={props}
            editPost={handleEditPost}
            deletePost={handleDeletePost}
            handleBookmark={handleBookmark}
            isBookmark={isBookmarkPost}
          />
        )}
      </Box>

      <Box
        display="flex"
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={2.5}
        alignItems="center">
        <Link to={`/users/${owner?.id}`}>
          <Avatar
            srcSet={owner?.profile?.photo}
            alt={owner?.profile?.name}
            sx={{ width: 56, height: 56, borderRadius: '50%' }}
          />
        </Link>
        <Link to={`/users/${owner?.id}`}>
          <Box
            display="flex"
            flexDirection="column"
            flex={1}
            justifyContent="center"
            py={1}>
            <Typography variant="h5" fontWeight="bold">
              {owner?.profile?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {owner?.profile?.headTitle}
            </Typography>
          </Box>
        </Link>
        <Typography
          variant="body1"
          color="textSecondary"
          alignSelf="flex-start"
          sx={{ marginLeft: 'auto' }}>
          {postedAt(createdAt)}
        </Typography>
      </Box>

      {category === 'Event' && (
        <Box
          display="flex"
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
          gap={2}
          color="textPrimary">
          <Typography fontWeight="600" flex={1}>
            {formatDate(startDate)} - {formatDate(endDate)}
          </Typography>
        </Box>
      )}

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

      <Card
        sx={{
          padding: 3,
          boxShadow: 1,
          flexDirection: 'column',
          borderRadius: '10px',
        }}>
        <Typography variant="body1" color="textSecondary">
          {description && parse(description)}
        </Typography>

        {category === 'Event' && lastPath !== 'absent' && (
          <Grid
            mt={2}
            display="flex"
            flexWrap={{ xs: 'wrap', md: 'nowrap' }}
            justifyContent="space-between"
            gap={5}>
            <Box display="flex" alignItems="center" gap={2}>
              <FaUserPlus />
              <Typography>
                {participants?.length} / {maxParticipants} Participant
              </Typography>
            </Box>
            {authUser?.role === 'user' && (
              <Button
                variant="contained"
                color={isUserParticipating ? 'error' : 'primary'}
                onClick={
                  isUserParticipating ? handleLeaveClick : handleJoinClick
                }
                disabled={
                  !isUserParticipating && (isEventFull || isEventEnded)
                }>
                {isUserParticipating ? 'Leave Event' : 'Join Event'}
              </Button>
            )}
          </Grid>
        )}
      </Card>

      <Modal opened={modalOpen} onClose={close} title="Confirm Action" centered>
        <Typography>
          {actionType === 'join'
            ? 'Are you sure you want to join this event?'
            : 'Are you sure you want to leave this event?'}
        </Typography>
        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={close} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
}

DetailPost.propTypes = {
  id: PropTypes.string.isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
  }),
  category: PropTypes.oneOf(['Event', 'News']).isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  owner: PropTypes.shape(ownerShape).isRequired,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  maxParticipants: PropTypes.number,
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string,
    }),
  ),
  bookmarks: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string,
    }),
  ),
  editPost: PropTypes.func,
  deletePost: PropTypes.func,
};

DetailPost.defaultProps = {
  image: '',
  startDate: '',
  endDate: '',
  maxParticipants: 0,
  participants: [],
  bookmarks: [],
  authUser: null,
  editPost: () => {},
  deletePost: () => {},
};

export default DetailPost;
