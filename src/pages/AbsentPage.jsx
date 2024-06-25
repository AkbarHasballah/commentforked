import React from 'react';
import LayoutForumApp from '../layouts/LayoutForumApp';
import SidebarContent from '../components/forumapp/SidebarContent';
import MainbarForum from '../layouts/MainbarForum';
import DetailPost from '../components/DetailPost';
import FormAbsent from '../components/forumapp/FormAbsent';
import { useSelector } from 'react-redux';

const detailForum = {
  category: 'event',
  title: 'Comptabilité - Problème Baisse de Charges',
  owner: {
    name: 'Ervalsa Dwi Nanda',
    avatar: 'https://i.pravatar.cc/300',
    headTitle: 'Software Engineer',
  },
  createdAt: '21 August 2023',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

function AbsentPage() {
  const authUser = useSelector((state) => state.authUser);
  return (
    <LayoutForumApp>
      <SidebarContent user={authUser} />
      <MainbarForum>
        <DetailPost
          title={detailForum.title}
          content={detailForum.content}
          owner={detailForum.owner}
          createdAt={detailForum.createdAt}
          category="event"
        />
        <FormAbsent />
      </MainbarForum>
    </LayoutForumApp>
  );
}

export default AbsentPage;
