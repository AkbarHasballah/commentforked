import React from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItemIcon,
  Card,
} from '@mui/material';
import { AccountCircle, VpnKey, ExitToApp } from '@mui/icons-material';
import { IconTrashFilled } from '@tabler/icons-react';

function ProfileSidebar({
  avatar,
  username,
  title,
  setActiveComponent,
  onSignOut,
}) {
  return (
    <Card>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={avatar} />
          </ListItemAvatar>
          <ListItemText primary={username} secondary={title} />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => setActiveComponent('profile')}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
        <ListItem button onClick={() => setActiveComponent('password')}>
          <ListItemIcon>
            <VpnKey />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
        <ListItem button onClick={() => setActiveComponent('delete')}>
          <ListItemIcon>
            <IconTrashFilled />
          </ListItemIcon>
          <ListItemText primary="Delete Account" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText onClick={onSignOut} primary="Sign Out" />
        </ListItem>
      </List>
    </Card>
  );
}

export default ProfileSidebar;
