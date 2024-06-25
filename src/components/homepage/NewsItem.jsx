import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postedAt } from '../../utils/date';
import ownerShape from '../../types/Owner';
import { URL_APP_FILE } from '../../utils/api';

function NewsItem({ id, image, title, date, owner }) {
  const [imageLoaded, setImageLoaded] = useState(true); // State to track image load status

  const handleImageError = () => {
    setImageLoaded(false); // Set state to false if image fails to load
  };

  return (
    <Link to={`/posts/${id}`}>
      <Card
        sx={{
          marginY: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200',
        }}>
        {imageLoaded && image ? (
          <CardMedia
            component="img"
            loading="lazy"
            image={URL_APP_FILE + image}
            alt={title}
            sx={{
              height: 200,
            }}
            onError={handleImageError} // Handle image load error
          />
        ) : (
          <Box
            sx={{
              height: 200,
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
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Grid>
            <Typography variant="body2" fontWeight="200">
              {postedAt(date)}
            </Typography>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
              {title}
            </Typography>
            <Typography variant="body2">{owner?.username}</Typography>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}

NewsItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
};

NewsItem.defaultProps = {
  image: '',
};

export default NewsItem;
