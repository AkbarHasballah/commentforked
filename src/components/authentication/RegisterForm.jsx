import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';
import { Link } from 'react-router-dom';

function RegisterForm({ register, color }) {
  const [username, onUsernameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const location = useLocation();
  const paths = location.pathname.split('/');
  const lastPath = paths[paths.length - 1];
  return (
    <Box
      component="form"
      width="100%"
      noValidate
      onSubmit={(e) => register(e, { username, email, password })}
      sx={{ mt: 5 }}
      display="flex"
      flexDirection="column"
      gap="10px">
      <Typography
        component="h3"
        variant="h5"
        textAlign="left"
        color={color}
        fontSize="18px"
        fontWeight="semibold">
        Register Your Self.
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        InputProps={{
          sx: { borderRadius: 15, borderColor: '#F6F8FD', color: { color } },
          color: 'success',
        }}
        id="username"
        label="Username"
        name="username"
        color="success"
        placeholder="Enter your username"
        autoComplete="username"
        value={username}
        onChange={onUsernameChange}
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        InputProps={{
          sx: { borderRadius: 15, borderColor: '#F6F8FD', color: { color } },
          color: 'success',
        }}
        id="email"
        label="Email Address"
        name="email"
        color="success"
        placeholder="Enter your email"
        autoComplete="email"
        value={email}
        onChange={onEmailChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        InputProps={{
          sx: { borderRadius: 15, borderColor: '#F6F8FD', color: { color } },
          color: 'success',
        }}
        name="password"
        placeholder="Enter your password"
        color="success"
        label="Password"
        type="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
        autoComplete="current-password"
      />
      <Typography
        textAlign="center"
        color={lastPath === 'user' ? 'softwhite' : 'softbrown'}
        fontSize="12px">
        By signing up, you agree to the Terms of Service and Privacy Policy,
        including Cookie Use.
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        style={{ borderRadius: 15, height: 56, backgroundColor: '#B99470' }}>
        Register
      </Button>
      <Grid container justifyContent="center">
        <Grid item display="flex" flexDirection="rows" gap="10px">
          <Typography
            component={Link}
            to="/login"
            variant="body2"
            color={lastPath === 'user' ? 'softwhite' : 'softbrown'}
            fontWeight="600">
            Sign In
          </Typography>
          <Typography
            variant="body2"
            color={lastPath === 'user' ? 'softwhite' : 'softbrown'}
            fontWeight="600">
            Or
          </Typography>
          <Typography
            component={Link}
            to={lastPath === 'user' ? '/register/company' : '/register/user'}
            variant="body2"
            color={lastPath === 'user' ? 'softwhite' : 'softbrown'}
            fontWeight="600">
            {lastPath === 'user' ? 'Join Official' : 'Join Participant'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  color: PropTypes.string,
};

RegisterForm.defaultProps = {
  color: 'white',
};

export default RegisterForm;
