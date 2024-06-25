import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import DetailPost from '../components/DetailPost';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { asyncReceivePostDetail } from '../states/postDetail/thunk';
import ListParticipant from '../components/ListParticipant';

function DetailPostPage() {
  const { postId } = useParams();
  const postDetail = useSelector((state) => state.postDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceivePostDetail(postId));
  }, [postId, dispatch]);

  return (
    <>
      <Navbar />
      <Container
        sx={{ my: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <DetailPost
          id={postId}
          title={postDetail?.title}
          image={postDetail?.image}
          description={postDetail?.description}
          maxParticipants={postDetail?.maxParticipants}
          participants={postDetail?.participants}
          owner={postDetail?.owner}
          createdAt={postDetail?.createdAt}
          startDate={postDetail?.startDate}
          endDate={postDetail?.endDate}
          category={postDetail?.category}
        />
        {postDetail?.category === 'Event' && (
          <ListParticipant participant={postDetail?.participants} variant="secondary" />
        )}
      </Container>
      <Footer />
    </>
  );
}

export default DetailPostPage;
