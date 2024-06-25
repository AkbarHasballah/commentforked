import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Container } from '@mui/material';
import Header from '../components/User/Header';
import ListEvent from '../components/ListEvent';
import { asyncReceiveUserDetail } from '../states/userDetail/thunk';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListPost from '../components/ListPost';

function UserPage() {
  const userDetail = useSelector((state) => state.userDetail);
  const users = useSelector((state) => state.users);
  const { userId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveUserDetail(userId));
  }, [dispatch]);
  const userPosts = userDetail?.posts;

  // Filter dan sortir events
  const currentEvent = userPosts
    ?.filter((post) => post.category === 'Event')
    ?.sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 2);

  // Filter events
  const eventsList = userPosts
    ?.filter((post) => post.category === 'Event')
    ?.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Filter news
  const newsList = userPosts
    ?.filter((post) => post.category === 'News')
    ?.sort((a, b) => new Date(a.date) - new Date(b.date));
  return (
    <>
      <Navbar />
      <Container sx={{ my: 5 }}>
        <Header user={userDetail} />
        {userDetail?.role === 'company' ? (
          <>
            <ListEvent title="Current Event" events={currentEvent} />
            <ListEvent title="Past Event" events={eventsList} />
            <ListEvent title="News" events={newsList} />
          </>
        ) : (
          <ListPost title="News" posts={userPosts} />
        )}
      </Container>
      <Footer />
    </>
  );
}

export default UserPage;
