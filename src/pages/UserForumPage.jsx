import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import LayoutForumApp from '../layouts/LayoutForumApp';
import SidebarContent from '../components/forumapp/SidebarContent';
import Header from '../components/User/Header';
import ListPost from '../components/ListPost';
import MainbarForum from '../layouts/MainbarForum';
import { asyncReceiveUserDetail } from '../states/userDetail/thunk';
import ListEvent from '../components/ListEvent';

function UserForumPage() {
  const userDetail = useSelector((state) => state.userDetail);
  const authUser = useSelector((state) => state.authUser);
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
    <LayoutForumApp>
      <SidebarContent user={authUser} />
      <MainbarForum>
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
      </MainbarForum>
    </LayoutForumApp>
  );
}

export default UserForumPage;
