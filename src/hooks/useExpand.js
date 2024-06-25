import { useState } from 'react';

export default function useExpand(expand) {
  const [expanded, setExpanded] = useState(expand);

  const handleExpandClick = (event) => {
    event.preventDefault();
    setExpanded(!expanded);
  };
  return [expanded, handleExpandClick];
}
