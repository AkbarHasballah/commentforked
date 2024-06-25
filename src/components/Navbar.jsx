import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ButtonAuthentication from './authentication/ButtonAuthentication';

function NavItem({ text, isActive, link }) {
  return (
    <Typography
      component={Link}
      fontWeight="500"
      to={link}
      underline="none"
      color={isActive ? 'green' : 'inherit'}>
      {text}
    </Typography>
  );
}

export default function Navbar({ authUser, signOut }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const getNavItems = () => {
    const homeItem = { text: 'Home', link: '/' };
    const trendsItem = { text: 'Trends', link: '/trends' };

    const authItems = [];
    if (authUser) {
      if (authUser.role === 'user') {
        authItems.push({ text: 'Upcoming', link: '/comingsoon' });
        authItems.push({ text: 'Recents', link: '/recents' });
      } else {
        authItems.push({ text: 'Upcoming', link: '/comingsoon' });
      }
    } else {
      authItems.push({ text: 'About', link: '/about' });
    }

    return [homeItem, trendsItem, ...authItems].filter(Boolean);
  };

  const navItems = getNavItems();
  return (
    <>
      <AppBar position="sticky" color="softwhite" style={{ zIndex: 200 }}>
        <Toolbar className="justify-between px-4 max-md:px-2">
          <Link to="/">
            <Typography
              variant="h6"
              color="green"
              fontWeight="bold"
              className="text-2xl"
              paddingLeft={isMobile ? '0' : '56px'}>
              Comment
            </Typography>
          </Link>
          <div className="flex-1 hidden md:flex justify-center">
            <div className="flex gap-5 justify-center">
              {navItems.map((item, index) => (
                <NavItem
                  key={index}
                  link={item.link}
                  text={item.text}
                  isActive={location.pathname === item.link}
                />
              ))}
            </div>
          </div>
          <Grid
            gap="8px"
            className="justify-end hidden md:flex"
            paddingRight={isTablet ? '0' : '56px'}>
            {authUser ? (
              <>
                <IconButton onClick={handleMenuOpen} color="inherit">
                  <Avatar
                    alt={authUser?.profile?.name}
                    src={authUser?.profile?.photo}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to="/mypost">
                    My Post
                  </MenuItem>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to="/bookmarks">
                    Bookmarks
                  </MenuItem>
                  <MenuItem onClick={signOut}>Sign Out</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link to="/register/user">
                  <ButtonAuthentication
                    text="Register"
                    styleType="primary"
                    variant="outlined"
                  />
                </Link>
                <Link to="/login">
                  <ButtonAuthentication text="Login" styleType="primary" />
                </Link>
              </>
            )}
          </Grid>
          <div className="flex-1 flex md:hidden justify-end">
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              className="mr-2">
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div
          className="w-64"
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}>
          <List>
            <ListItem
              components={Typography}
              sx={{ color: 'green', fontWeight: 'bold' }}
              className="text-2xl">
              Comment
            </ListItem>
            {navItems.map((item, index) => (
              <ListItem button key={index}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <List>
            {authUser ? (
              <ListItem button>
                <ListItemText primary="Sign Out" onClick={signOut} />
              </ListItem>
            ) : (
              <>
                <ListItem button>
                  <Link to="/register/user">
                    <ListItemText primary="Register" />
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link to="/login">
                    <ListItemText primary="Login" />
                  </Link>
                </ListItem>
              </>
            )}
          </List>
        </div>
      </Drawer>
    </>
  );
}
