import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import AuthenticationHeader from '../components/authentication/AuthenticationHeader';
import Copyright from '../components/Copyright';
import RegisterForm from '../components/authentication/RegisterForm';
import LayoutAuthentication from '../layouts/LayoutAuthentication';
import { asyncRegisterUser } from '../states/users/thunk';
import registerPicture from '../assets/register-picture.png';

function RegisterUser() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e, data) => {
    e.preventDefault();
    const { username, email, password, role = 'user' } = data;
    try {
      const { error } = await dispatch(
        asyncRegisterUser({
          username,
          email,
          password,
          role,
        }),
      );
      if (!error) {
        navigate('/login');
      }
    } catch (error) {
      navigate('/register/user');
    }
  };

  return (
    <Grid
      sx={{ height: '110vh' }}
      container
      component="main"
      backgroundColor="softwhite">
      <LayoutAuthentication>
        <AuthenticationHeader
          title="Comment"
          subtitle="Start your Volunteer Journey With us."
          textAlign={isMobile ? 'center' : 'left'}
        />
        <RegisterForm register={handleSubmit} />
        <Copyright sx={{ mt: 5 }} color="softwhite" />
      </LayoutAuthentication>

      {!isMobile && (
        <Grid item xs={false} sm={4} md={7} alignContent="center">
          <Box
            component="img"
            loading="lazy"
            style={{ width: '512px', height: '512px', margin: 'auto' }}
            alt="Register picture."
            src={registerPicture}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default RegisterUser;
