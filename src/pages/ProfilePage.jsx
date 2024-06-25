import React, { useState } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import ProfileDetails from '../components/Profile/ProfileDetails';
import ChangePassword from '../components/Profile/ChangePassword';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authentication/thunk';
import { useNavigate } from 'react-router';
import {
  asyncChangePassword,
  asyncDeleteUserByAuth,
  asyncUpdateProfile,
} from '../states/users/thunk';
import DeleteAccount from '../components/Profile/DeleteAccount';

function ProfilePage() {
  const [activeComponent, setActiveComponent] = useState('profile');
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateProfile = async (data) => {
    await dispatch(asyncUpdateProfile(data));
  };

  const handleSignOut = () => {
    // handle sign out logic
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  const handleChangePassword = async (data) => {
    await dispatch(asyncChangePassword(data));
  };

  const handleDeleteAccount = async () => {
    await dispatch(asyncDeleteUserByAuth());
    navigate('/');
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return (
          <ProfileDetails
            avatar={authUser?.profile?.photo}
            username={authUser?.username}
            name={authUser?.profile?.name}
            headTitle={authUser?.profile?.headTitle}
            email={authUser?.email}
            phone={authUser?.profile?.phone}
            onUpdate={handleUpdateProfile}
          />
        );
      case 'password':
        return <ChangePassword changePassword={handleChangePassword} />;
      case 'delete':
        return <DeleteAccount deleteAccount={handleDeleteAccount} />;
      default:
        return (
          <ProfileDetails
            avatar={authUser?.profile?.photo}
            username={authUser?.username}
            name={authUser?.profile?.name}
            headTitle={authUser?.profile?.headTitle}
            email={authUser?.email}
            phone={authUser?.profile?.phone}
            onUpdate={handleUpdateProfile}
          />
        );
    }
  };

  return (
    <Container
      sx={{
        my: 5,
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProfileSidebar
            avatar={authUser?.profile?.photo}
            username={authUser?.username}
            title={authUser?.profile?.headTitle}
            setActiveComponent={setActiveComponent}
            onSignOut={handleSignOut}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2, width: '100%' }}>{renderComponent()}</Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfilePage;
