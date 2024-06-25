import * as React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { FaUser, FaUserPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/date';
import Bookmark from './forumapp/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { asyncAddBookmarkPost, asyncRemoveBookmarkPost } from '../states/posts/thunk';
import { URL_APP_FILE } from '../utils/api';

function AuthorDetails({ name }) {
  return (
    <div className="flex gap-1 mt-2 font-medium text-gray-500 max-md:flex-wrap">
      <FaUser />
      <span className="flex-1 max-md:max-w-full">{name}</span>
    </div>
  );
}

AuthorDetails.propTypes = {
  name: PropTypes.string.isRequired,
};

function Stats({ registeredCount, maxParticipants }) {
  return (
    <div className="flex gap-2 items-center">
      <FaUserPlus />
      <span className="text-sm">
        {registeredCount} / {maxParticipants} Participant
      </span>
    </div>
  );
}

Stats.propTypes = {
  registeredCount: PropTypes.number.isRequired,
  maxParticipants: PropTypes.number.isRequired,
};

function PostByCategory(props) {
  const {
    id,
    title,
    description,
    owner,
    startDate,
    endDate,
    category,
    postImage,
    maxParticipants,
    participants,
    bookmarks,
  } = props;
  const [imageError, setImageError] = React.useState(false);
  const authUser = useSelector((state) => state.authUser);
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

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link to={`/posts/${id}`}>
      <Card className="flex flex-col self-stretch text-sm leading-5 bg-white rounded-lg text-zinc-800">
        {postImage && !imageError && (
          <CardMedia
            component="img"
            loading="lazy"
            image={URL_APP_FILE + postImage}
            alt={title}
            className="w-full aspect-[8.33] max-md:max-w-full"
            onError={handleImageError}
          />
        )}
        <CardContent className="flex flex-col p-6 w-full max-md:px-5 max-md:max-w-full gap-1">
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            className="text-2xl leading-8 max-md:max-w-full"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Typography>
          <AuthorDetails name={owner?.profile?.name} />
          {category === 'Event' && (
            <Typography
              variant="body2"
              component="time"
              className="mt-2 font-semibold text-gray-500 max-md:max-w-full"
            >
              {formatDate(startDate)} - {formatDate(endDate)}
            </Typography>
          )}
          <Typography
            variant="body2"
            component="p"
            className="mt-4 font-medium max-md:max-w-full"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {description && parse(description)}
          </Typography>
          <div className="flex gap-5 pr-20 mt-4 text-base text-gray-700 max-md:flex-wrap max-md:pr-5">
            {category === 'Event' && (
              <Stats registeredCount={participants?.length} maxParticipants={maxParticipants} />
            )}
            <Bookmark onClick={handleBookmark} isBookmark={isBookmarkPost} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

PostByCategory.propTypes = {
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
  postImage: PropTypes.string,
  maxParticipants: PropTypes.number,
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string,
    }),
  ),
};

PostByCategory.defaultProps = {
  startDate: null,
  endDate: null,
  postImage: null,
  maxParticipants: 0,
  participants: [],
};

export default PostByCategory;
