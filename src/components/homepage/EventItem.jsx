import React, { useState } from 'react';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ownerShape from '../../types/Owner';
import participantShape from '../../types/Participant';
import { URL_APP_FILE } from '../../utils/api';

function EventItem(props) {
  const { id, image, title, owner, maxParticipants, participants } = props;

  const percentage = Math.floor((participants?.length / maxParticipants) * 100);
  const [imageLoaded, setImageLoaded] = useState(true); // State to track image load status

  const handleImageError = () => {
    setImageLoaded(false); // Set state to false if image fails to load
  };

  return (
    <Link to={`/posts/${id}`}>
      <Card
        sx={{
          marginY: 1,
          boxShadow: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200',
        }}>
        {imageLoaded && image ? (
          <CardMedia
            component="img"
            loading="lazy"
            src={URL_APP_FILE + image}
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
            style={{ objectFit: 'cover', height: '192px', width: '100%' }}
            onError={handleImageError} // Handle image load error
          />
        ) : (
          <Box
            sx={{
              height: '192px', // Height equivalent to 'h-48'
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey.200', // Background color when image is not loaded
            }}>
            <Typography variant="h6" color="text.secondary">
              {title}
            </Typography>
          </Box>
        )}
        <CardContent className="p-4">
          <Typography
            variant="h6"
            component="h3"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: 'bold',
            }}>
            {title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              mb: 2,
              gap: 1,
            }}>
            <FontAwesomeIcon icon={faBuilding} />
            <Typography variant="body2" fontWeight="bold">
              {owner?.profile?.name}
            </Typography>
          </Box>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className="absolute top-0 left-0 h-full bg-green-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Target: {`${participants?.length} / ${maxParticipants}`}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            mb={1}
            textAlign="right">
            {percentage} %
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

EventItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  participants: PropTypes.arrayOf(PropTypes.shape(participantShape)).isRequired,
  maxParticipants: PropTypes.number.isRequired,
};

EventItem.defaultProps = {
  image: '',
};

export default EventItem;
