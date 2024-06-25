import { Grid, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import AuthenticationHeader from '../components/authentication/AuthenticationHeader';
import Copyright from '../components/Copyright';
import RegisterForm from '../components/authentication/RegisterForm';
import LayoutAuthentication from '../layouts/LayoutAuthentication';
import { asyncRegisterUser } from '../states/users/thunk';

function RegisterCompany() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e, data) => {
    e.preventDefault();
    const { username, email, password, role = 'company' } = data;
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
  };

  return (
    <Grid
      container
      component="main"
      sx={{ height: '110vh' }}
      backgroundColor="softwhite">
      <LayoutAuthentication backgroundColor="softwhite">
        <AuthenticationHeader
          title="Comment"
          subtitle="Open your Journey and Start With us."
          textAlign={isMobile ? 'center' : 'left'}
          color="green"
        />
        <RegisterForm register={handleSubmit} color="green" />
        <Copyright sx={{ mt: 5 }} color="softbrown" />
      </LayoutAuthentication>
      {!isMobile && (
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          alignContent="center"
          sx={{
            backgroundImage: 'url(https://wallpaperaccess.com/full/643401.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
    </Grid>
  );
}

export default RegisterCompany;
