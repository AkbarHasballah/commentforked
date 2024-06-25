import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterUser from './pages/RegisterUser';
import RegisterCompany from './pages/RegisterCompany';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutPage';
import ForumPage from './pages/ForumPage';
import DetailForumPage from './pages/DetailForumPage';
import CreateForumPage from './pages/CreateForumPage';
import BookmarkPage from './pages/BookMarkPage';
import TrendingPage from './pages/TrendingPage';
import ComingSoonPage from './pages/ComingSoonPage';
import ProfilPage from './pages/ProfilePage';
import JoinParticipantPage from './pages/JoinParticipantPage';
import AbsentPage from './pages/AbsentPage';
import DetailPostPage from './pages/DetailPostPage';
import UserPage from './pages/UserPage';
import { asyncPreloadProcess } from './states/isPreload/thunk';
import Navbar from './components/Navbar';
import { asyncUnsetAuthUser } from './states/authentication/thunk';
import TrendingForumPage from './pages/TrendingForumPage';
import MyPostPage from './pages/MyPostPage';
import UserForumPage from './pages/UserForumPage';
import RecentEventsPage from './pages/RecentEventsPage';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser == null) {
    return (
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register/user" element={<RegisterUser />} />
          <Route path="/register/company" element={<RegisterCompany />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/trends" element={<TrendingPage />} />
          <Route path="/posts/:postId" element={<DetailPostPage />} />
          <Route path="/users/:userId" element={<UserPage />} />
        </Routes>
      </div>
    );
  }
  return (
    <>
      <Navbar authUser={authUser} signOut={onSignOut} />
      <Routes>
        <Route path="/" element={<ForumPage />} />
        <Route path="/posts/:postId" element={<DetailForumPage />} />
        <Route
          path="/events/:id/participant"
          element={<JoinParticipantPage />}
        />
        {/* <Route path="/events/:id/absent" element={<AbsentPage />} /> */}
        <Route path="/create" element={<CreateForumPage />} />
        <Route path="/mypost" element={<MyPostPage />} />
        <Route path="/bookmarks" element={<BookmarkPage />} />
        <Route path="/trends" element={<TrendingForumPage />} />
        <Route path="/comingsoon" element={<ComingSoonPage />} />
        <Route path="/recents" element={<RecentEventsPage />} />
        <Route path="/users/:userId" element={<UserForumPage />} />
        <Route path="/profile" element={<ProfilPage />} />
      </Routes>
    </>
  );
}

export default App;
