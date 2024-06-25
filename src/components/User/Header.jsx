import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import TagIcon from '@mui/icons-material/Tag';
import PostAddIcon from '@mui/icons-material/PostAdd';

function Header({ user }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        mb: 4,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        padding: 2,
        borderRadius: '20px',
      }}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid
          item
          xs={12}
          md={2}
          container
          justifyContent={isMobile ? 'center' : 'flex-start'}>
          <Avatar
            src={user?.profile?.photo}
            alt={user?.profile?.name}
            sx={{ width: 150, height: 150 }}
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <CardContent sx={{ textAlign: isMobile ? 'center' : 'left' }}>
            <Typography
              variant="h5"
              sx={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 'bold' }}>
              {user?.profile?.name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '600' }}>
              {user?.profile?.headTitle}
            </Typography>
            <Box mt={2}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <EmailIcon />
                    </Grid>
                    <Grid item>
                      <Typography sx={{ fontFamily: 'Plus Jakarta Sans' }}>
                        {user?.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <PhoneIcon />
                    </Grid>
                    <Grid item>
                      <Typography sx={{ fontFamily: 'Plus Jakarta Sans' }}>
                        {user?.profile?.phone}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={2} justifyContent="center" mt={1}>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <TagIcon />
                    </Grid>
                    <Grid item>
                      <Typography sx={{ fontFamily: 'Plus Jakarta Sans' }}>
                        {user?.username}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <PostAddIcon />
                    </Grid>
                    <Grid item>
                      <Typography sx={{ fontFamily: 'Plus Jakarta Sans' }}>
                        {user?.posts?.length} Post
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Header;
