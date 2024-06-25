import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutForumApp from '../layouts/LayoutForumApp';
import MainbarForum from '../layouts/MainbarForum';
import SidebarContent from '../components/forumapp/SidebarContent';
import ListPost from '../components/ListPost';
import { asyncForumPostsAndUsersByUpcoming } from '../states/shared/thunk';

function ComingSoonPage() {
  const authUser = useSelector((state) => state.authUser);
  const upcomingPosts = useSelector((state) => state.posts.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncForumPostsAndUsersByUpcoming());
  }, [dispatch]);

  return (
    <LayoutForumApp>
      <SidebarContent user={authUser} />
      <MainbarForum>
        <ListPost title="Coming Soon" posts={upcomingPosts} />
      </MainbarForum>
    </LayoutForumApp>
  );
}

export default ComingSoonPage;
