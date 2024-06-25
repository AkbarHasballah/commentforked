import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutForumApp from '../layouts/LayoutForumApp';
import MainbarForum from '../layouts/MainbarForum';
import PostForm from '../components/forumapp/PostForm';
import SidebarContent from '../components/forumapp/SidebarContent';
import { asyncAddPost } from '../states/posts/thunk';
import { useNavigate } from 'react-router';

function CreateForumPage() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = (data) => {
    const { error } = dispatch(asyncAddPost(data));
    if (!error) {
      navigate('/');
    }
  };

  return (
    <LayoutForumApp>
      <SidebarContent user={authUser} />
      <MainbarForum>
        <PostForm addPost={handlerSubmit} />
      </MainbarForum>
    </LayoutForumApp>
  );
}

export default CreateForumPage;
