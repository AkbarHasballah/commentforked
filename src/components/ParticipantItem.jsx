import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ParticipantItem(props) {
  const { id, name, headTitle, avatar, variant } = props;
  const theme = useTheme();
  const backgroundColor =
    variant === 'secondary' ? theme.palette.primary.main : 'white';
  const textColor = variant === 'secondary' ? 'white' : 'black';
  return (
    <Link to={`/users/${id}`}>
      <Card sx={{ backgroundColor, borderRadius: '8px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={avatar} />
          <Grid marginX={2} display="flex" flexDirection="column">
            <Typography fontWeight="bold" color={textColor}>
              {name}
            </Typography>
            <Typography
              color={
                variant === 'secondary' ? theme.palette.softwhite : 'black'
              }>
              {headTitle}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}

ParticipantItem.propTypes = {
  name: PropTypes.string.isRequired,
  headTitle: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

ParticipantItem.defaultProps = {
  variant: 'primary',
};
