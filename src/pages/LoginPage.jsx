import React from 'react';
import { useMediaQuery, Box, Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import Copyright from '../components/Copyright';
import LoginForm from '../components/authentication/LoginForm';
import AuthenticationHeader from '../components/authentication/AuthenticationHeader';
import LayoutAuthentication from '../layouts/LayoutAuthentication';
import { asyncSetAuthUser } from '../states/authentication/thunk';
import loginPicture from '../assets/login-picture.png';

export default function LoginPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    try {
      const { error } = await dispatch(asyncSetAuthUser(data));
      console.log(error);
      if (!error) {
        navigate('/');
      }
    } catch (error) {
      navigate('/login');
    }
  };

  return (
    <Grid
      sx={{ height: '100vh' }}
      container
      component="main"
      backgroundColor="softwhite">
      {!isMobile && (
        <Grid item xs={false} sm={4} md={7} alignContent="center">
          <Box
            component="img"
            loading="lazy"
            style={{ width: '512px', height: '512px', margin: 'auto' }}
            alt="Login picture."
            src={loginPicture}
          />
        </Grid>
      )}
      <LayoutAuthentication>
        <AuthenticationHeader
          title="Comment"
          subtitle="Volunteer Initiatives for a Cleaner Earth."
          textAlign={isMobile ? 'center' : 'right'}
        />
        <LoginForm login={handleSubmit} />
        <Copyright sx={{ mt: 5 }} color="softwhite" />
      </LayoutAuthentication>
    </Grid>
  );
}
