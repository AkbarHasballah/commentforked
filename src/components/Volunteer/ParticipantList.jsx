import React from 'react';
import { Box, Typography, Grid, Avatar, Paper, useMediaQuery, Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

const ParticipantList = ({ participants }) => {
  const groupParticipants = (participants, itemsPerGroup) => {
    const groups = [];
    for (let i = 0; i < participants.length; i += itemsPerGroup) {
      groups.push(participants.slice(i, i + itemsPerGroup));
    }
    return groups;
  };

  const isMobile = useMediaQuery('(max-width:600px)');

  const groupedParticipants = groupParticipants(participants, 4);

  return (
    <Container>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Participants</Typography>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        className="rounded-lg"
      >
        {groupedParticipants.map((group, index) => (
          <SwiperSlide key={index}>
            <Grid container spacing={2}>
              {group.map((participant, idx) => (
                <Grid item xs={isMobile ? 12 : 5.7} key={idx}>
                  <Paper elevation={3} sx={{ padding: 1, display: 'center', alignItems: 'center', backgroundColor: 'green', color: 'white', maxHeight: isMobile ? 'none' : 100 }}>
                    <Avatar src={participant.image} />
                    <Box marginLeft={2}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {participant.name}
                      </Typography>
                      <Typography variant="body2">
                        {participant.role}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default ParticipantList;
