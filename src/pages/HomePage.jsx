import React from 'react';
import 'swiper/swiper.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import homeImage from '../assets/home.png';
import LayoutHomepage from '../layouts/LayoutHomepage';
import ListHomepage from '../components/homepage/ListHomepage';
import VolunteerItem from '../components/homepage/VolunteerItem';
import EventItem from '../components/homepage/EventItem';
import NewsItem from '../components/homepage/NewsItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncHomePostsAndUsers } from '../states/shared/thunk';

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.data);
  const users = useSelector((state) => state.users);

  const eventsList = posts
    ?.filter((post) => post.category === 'Event')
    ?.slice(0, 10);
  const newsList = posts
    ?.filter((post) => post.category === 'News')
    ?.slice(0, 10);
  const usersList = users?.slice(0, 6);
  useEffect(() => {
    dispatch(asyncHomePostsAndUsers());
  }, [dispatch]);

  let slidesPerView = 1;
  if (isMobile) {
    slidesPerView = 1;
  } else if (isTablet) {
    slidesPerView = 3;
  } else if (isDesktop) {
    slidesPerView = 5;
  }

  return (
    <>
      <Navbar />
      <LayoutHomepage>
        <Grid
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}>
          <Box
            component="img"
            loading="lazy"
            src={homeImage}
            alt="Background"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Grid
            sx={{
              position: 'absolute',
              top: 0,
              width: '70%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: 'white',
              px: 2, // Responsive padding
              gap: '5px',
              [theme.breakpoints.up('sm')]: {
                px: 10, // Padding for larger screens
                gap: '20px',
              },
            }}>
            <Typography
              sx={{
                color: 'white',
                fontSize: {
                  xs: 20, // font size for extra small screens
                  sm: 32, // font size for extra small screens
                  lg: 40, // font size for larg screens and up
                },
                fontWeight: 600,
                wordWrap: 'break-word',
              }}>
              Program Volunteer
            </Typography>
            <Typography
              sx={{
                color: 'white',
                fontSize: {
                  xs: 16, // font size for extra small screens
                  sm: 20, // font size for small screens and up
                  lg: 32, // font size for large screens and up
                },
                fontFamily: 'Plus Jakarta Sans',
                fontWeight: 600,
                wordWrap: 'break-word',
              }}>
              Bergabunglah dengan gerakan global untuk menjaga bumi kita! Anda
              dapat berkontribusi dalam berbagai program lingkungan, menemukan
              kegiatan di sekitar Anda, dan membuat dampak nyata.
            </Typography>
          </Grid>
        </Grid>
        <ListHomepage title="Volunteer">
          <Swiper
            spaceBetween={20}
            slidesPerView={slidesPerView}
            pagination={{ clickable: true }}
            navigation
            className="rounded-lg">
            {usersList?.map((volunteer) => (
              <SwiperSlide key={volunteer.id}>
                <VolunteerItem
                  id={volunteer?.id}
                  photo={volunteer?.profile?.photo}
                  name={volunteer?.profile?.name}
                  headTitle={volunteer?.profile?.headTitle}
                  phone={volunteer?.profile?.phone}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </ListHomepage>
        <ListHomepage title="Event">
          <Swiper
            spaceBetween={20}
            slidesPerView={slidesPerView}
            pagination={{ clickable: true }}
            navigation
            className="rounded-lg">
            {eventsList?.map((slide) => (
              <SwiperSlide key={slide.id}>
                <EventItem
                  id={slide?.id}
                  image={slide?.image}
                  title={slide?.title}
                  owner={slide?.owner}
                  participants={slide?.participants}
                  maxParticipants={slide?.maxParticipants}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </ListHomepage>
        <ListHomepage title="News">
          <Swiper
            spaceBetween={20}
            slidesPerView={slidesPerView}
            pagination={{ clickable: true }}
            navigation
            className="rounded-lg">
            {newsList?.map((slide) => (
              <SwiperSlide className="w-full" key={slide.id}>
                <NewsItem
                  id={slide?.id}
                  image={slide?.image}
                  title={slide?.title}
                  owner={slide?.owner}
                  date={slide?.createdAt}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </ListHomepage>
      </LayoutHomepage>
      <Footer />
    </>
  );
}

export default HomePage;
