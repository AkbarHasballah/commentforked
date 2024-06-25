import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutForumApp from '../layouts/LayoutForumApp';
import MainbarForum from '../layouts/MainbarForum';
import SidebarContent from '../components/forumapp/SidebarContent';
import ListPost from '../components/ListPost';
import {
  asyncForumPostsAndUsersByUpcoming,
  asyncForumRecentEvents,
} from '../states/shared/thunk';

function RecentEventsPage() {
  const authUser = useSelector((state) => state.authUser);
  const recentEvents = useSelector((state) => state.posts.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncForumRecentEvents(authUser?.id));
  }, [dispatch]);

  return (
    <LayoutForumApp>
      <SidebarContent user={authUser} />
      <MainbarForum>
        <ListPost title="Recent Events" posts={recentEvents} />
      </MainbarForum>
    </LayoutForumApp>
  );
}

export default RecentEventsPage;
