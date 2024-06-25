import React from 'react';
import { Box, Paper } from '@mui/material';
import Header from './Header';
import Content from './Content';

const VolunteerDetail = ({ event }) => (
  <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
    <Paper
      elevation={3}
      sx={{ maxWidth: 1300, width: '100%', marginBottom: 3 }}>
      <Header
        title={event.title}
        dateRange={event.dateRange}
        authorName={event.author.name}
        authorRole={event.author.role}
        authorImage={event.author.image}
        timeAgo={event.timeAgo}
      />
      <Content
        imageSrc={event.content.image}
        contentText={event.content.text}
        registered={event.registered}
      />
    </Paper>
  </Box>
);

export default VolunteerDetail;
