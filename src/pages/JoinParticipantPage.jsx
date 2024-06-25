import React from 'react';
import LayoutForumApp from '../layouts/LayoutForumApp';
import SidebarContent from '../components/forumapp/SidebarContent';
import MainbarForum from '../layouts/MainbarForum';
import TableParticipant from '../components/forumapp/TableParticipant';
import { useSelector } from 'react-redux';

const data = [
  {
    id: 1,
    name: 'John Doe',
    email: 'NQpP1@example.com',
    createdAt: '2022-01-01',
    absent: 'https://random.imagecdn.app/500/150',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'NQpP1@example.com',
    address: '456 Main St',
    createdAt: '2022-01-01',
    absent: 'https://random.imagecdn.app/500/150',
  },
];

function JoinParticipantPage() {
  const authUser = useSelector((state) => state.authUser);
  return (
    <LayoutForumApp>
      <SidebarContent user={authUser} />
      <MainbarForum>
        <TableParticipant
          title="Comptabilité - Problème Baisse de Charges"
          data={data}
        />
      </MainbarForum>
    </LayoutForumApp>
  );
}

export default JoinParticipantPage;
