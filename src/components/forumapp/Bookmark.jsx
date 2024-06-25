import React from 'react';
import { BookmarkBorder } from '@mui/icons-material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Button } from '@mui/material';
function Bookmark({ onClick, isBookmark }) {
  return (
    <Button
      className="flex gap-1.5 whitespace-nowrap focus:outline-none"
      onClick={onClick}>
      {isBookmark ? (
        <BookmarkIcon className="shrink-0" fontSize="small" />
      ) : (
        <BookmarkBorder fontSize="small" className="shrink-0" />
      )}
      <span className="my-auto">Bookmark</span>
    </Button>
  );
}

export default Bookmark;
