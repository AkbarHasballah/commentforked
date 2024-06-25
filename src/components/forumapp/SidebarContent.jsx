import React from 'react';
import SidebarForum from '../../layouts/SidebarForum';
import CardUser from './CardUser';
import RecentEvents from './RecentEvent';

function SidebarContent({ user }) {
  const listRecentEvent = user?.recentEvents?.slice(0, 5);
  return (
    <SidebarForum>
      <CardUser
        name={user?.profile?.name}
        photo={user?.profile?.photo}
        headTitle={user?.profile?.headTitle}
      />
      {user?.recentEvents?.length > 0 && (
        <RecentEvents events={listRecentEvent} />
      )}
    </SidebarForum>
  );
}

export default SidebarContent;
