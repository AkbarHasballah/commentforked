import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutForumApp from '../layouts/LayoutForumApp';
import MainbarForum from '../layouts/MainbarForum';
import SidebarContent from '../components/forumapp/SidebarContent';
import ListPost from '../components/ListPost';
import { asyncForumMyPosts } from '../states/shared/thunk';

function MyPostPage() {
  const myPost = useSelector((state) => state.posts.data);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();
  console.log(myPost);
  useEffect(() => {
    dispatch(asyncForumMyPosts(authUser.id));
  }, [dispatch]);
  return (
    <LayoutForumApp>
      <SidebarContent user={authUser} />
      <MainbarForum>
        <ListPost title="My Post" posts={myPost} />
      </MainbarForum>
    </LayoutForumApp>
  );
}

export default MyPostPage;
