import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box, Button, Container } from '@mui/material';
import TrendItem from '../components/Trending/TrendItem';
import { asyncHomePostsAndUsers } from '../states/shared/thunk';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventItem from '../components/homepage/EventItem';
import VolunteerItem from '../components/homepage/VolunteerItem';
import NewsItem from '../components/homepage/NewsItem';

function FilterButtons({ activeFilter, setActiveFilter }) {
  return (
    <Box sx={{ display: 'flex', mb: 3, gap: 2 }}>
      <Button
        variant={activeFilter === 'Event' ? 'contained' : 'outlined'}
        onClick={() => setActiveFilter('Event')}
        sx={{ borderRadius: '20px', padding: '5px 20px' }}>
        Event
      </Button>
      <Button
        variant={activeFilter === 'Volunteer' ? 'contained' : 'outlined'}
        onClick={() => setActiveFilter('Volunteer')}
        sx={{ borderRadius: '20px', padding: '5px 20px' }}>
        Volunteer
      </Button>
      <Button
        variant={activeFilter === 'News' ? 'contained' : 'outlined'}
        onClick={() => setActiveFilter('News')}
        sx={{ borderRadius: '20px', padding: '5px 20px' }}>
        News
      </Button>
    </Box>
  );
}

function TrendPage() {
  const [activeFilter, setActiveFilter] = useState('Event');
  const dispatch = useDispatch();
  const trendsPosts = useSelector((state) => state.posts.data);
  const trendsUsers = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(asyncHomePostsAndUsers());
  }, [dispatch]);

  const trendsEvent = trendsPosts.filter((post) => post.category === 'Event');
  const trendsNews = trendsPosts.filter((post) => post.category === 'News');

  return (
    <>
      <Navbar />
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 4,
          }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Trends
          </Typography>
        </Box>
        <FilterButtons
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        {activeFilter === 'Event' && (
          <Grid container spacing={3}>
            {trendsEvent.map((trend) => (
              <Grid item xs={12} sm={6} md={4} key={trend.id}>
                <EventItem
                  id={trend.id}
                  image={trend.image}
                  title={trend.title}
                  owner={trend.owner}
                  participants={trend.participants}
                  maxParticipants={trend.maxParticipants}
                />
              </Grid>
            ))}
          </Grid>
        )}
        {activeFilter === 'Volunteer' && (
          <Grid container spacing={3}>
            {trendsUsers.map((trend) => (
              <Grid item xs={12} sm={6} md={4} key={trend.id}>
                <VolunteerItem
                  id={trend?.id}
                  photo={trend?.profile?.photo}
                  name={trend?.profile?.name}
                  headTitle={trend?.profile?.headTitle}
                  phone={trend?.profile?.phone}
                />
              </Grid>
            ))}
          </Grid>
        )}
        {activeFilter === 'News' && (
          <Grid container spacing={3}>
            {trendsNews.map((trend) => (
              <Grid item xs={12} sm={6} md={4} key={trend.id}>
                <NewsItem
                  id={trend?.id}
                  image={trend?.image}
                  title={trend?.title}
                  owner={trend?.owner}
                  date={trend?.createdAt}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default TrendPage;
