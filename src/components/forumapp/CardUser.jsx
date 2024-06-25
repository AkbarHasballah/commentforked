import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardUser(props) {
  const { name, photo, headTitle } = props;
  return (
    <Link to="/profile">
      <Card
        sx={{
          borderRadius: '12px',
        }}
        className="w-full lg:w-[256px]">
        <Avatar
          loading="lazy"
          sx={{
            width: 50,
            height: 50,
            margin: 'auto',
            marginTop: '24px',
          }}
          src={photo}
          alt={`Profile picture of ${name}`}
        />
        <CardContent>
          <Grid gap="6px" display="flex" flexDirection="column">
            <Typography fontWeight="bold" align="center">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {headTitle}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}

CardUser.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  headTitle: PropTypes.string,
};

CardUser.defaultProps = {
  headTitle: null,
};

export default CardUser;
