import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutForumApp from '../layouts/LayoutForumApp';
import SidebarContent from '../components/forumapp/SidebarContent';
import MainbarForum from '../layouts/MainbarForum';
import ListPost from '../components/ListPost';
import { asyncForumPostsAndUsersByTrends } from '../states/shared/thunk';

function TrendingForumPage() {
  const authUser = useSelector((state) => state.authUser);
  const trendingPost = useSelector((state) => state.posts.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncForumPostsAndUsersByTrends());
  }, [dispatch]);

  return (
    <LayoutForumApp>
      <SidebarContent user={authUser} />
      <MainbarForum>
        <ListPost title="Trending" posts={trendingPost} />
      </MainbarForum>
    </LayoutForumApp>
  );
}

export default TrendingForumPage;
