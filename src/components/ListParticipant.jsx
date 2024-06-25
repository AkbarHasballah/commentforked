import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import ParticipantItem from './ParticipantItem';
import ownerShape from '../types/Owner';

function ListParticipant({ participant, variant }) {
  const groupParticipants = (participants, itemsPerGroup) => {
    const groups = [];
    for (let i = 0; i < participants?.length; i += itemsPerGroup) {
      groups.push(participants.slice(i, i + itemsPerGroup));
    }
    return groups;
  };
  const groupedParticipants = groupParticipants(participant, 4);
  return (
    <Grid width="100%" container gap="15px">
      <Grid
        width="100%"
        flexDirection="row"
        display="flex"
        alignItems="center"
        justifyContent="space-between">
        <Typography
          style={{
            fontSize: 20,
            fontWeight: '700',
            wordWrap: 'break-word',
          }}>
          Participant
        </Typography>
      </Grid>
      <Box width="100%">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          className="rounded-lg">
          {groupedParticipants.map((group, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-1">
                {group.map((item, idx) => (
                  <ParticipantItem
                    variant={variant}
                    key={idx}
                    id={item?.owner?.id}
                    name={item?.owner?.profile?.name}
                    headTitle={item?.owner?.profile?.headTitle}
                    avatar={item?.owner?.profile?.photo}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Grid>
  );
}

ListParticipant.propTypes = {
  participant: PropTypes.shape(ownerShape).isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

ListParticipant.defaultProps = {
  variant: 'primary',
};

export default ListParticipant;
