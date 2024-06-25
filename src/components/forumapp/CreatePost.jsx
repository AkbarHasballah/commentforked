import * as React from 'react';
import {
  Paper,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';
import Create from '@mui/icons-material/Create';

function MediaOption({ icon: Icon, label }) {
  return (
    <Box display="flex" gap={2} alignItems="center">
      <Icon fontSize="small" />
      <Typography>{label}</Typography>
    </Box>
  );
}
const mediaOptions = [
  { icon: PhotoIcon, label: 'Photo' },
  { icon: VideoLibraryIcon, label: 'Video' },
  { icon: EventIcon, label: 'Event' },
  { icon: ArticleIcon, label: 'Article' },
];

function CreatePost() {
  return (
    <Link to="/create">
      <Paper elevation={1} sx={{ padding: 2, borderRadius: 2 }}>
        <Box display="flex" gap={2} alignItems="center" mb={2}>
          <IconButton>
            <Create />
          </IconButton>
          <Typography>Write something ...</Typography>
        </Box>
        <Box
          display="flex"
          gap={2}
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {mediaOptions.map((option) => (
            <MediaOption key={option.label} {...option} />
          ))}
        </Box>
      </Paper>
    </Link>
  );
}

export default CreatePost;
