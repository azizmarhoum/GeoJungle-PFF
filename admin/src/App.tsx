import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import PostsPage from './pages/PostsPage';
import UserDetailPage from './pages/UserDetailPage';
import PostDetailPage from './pages/PostDetailPage';
import BadgesPage from './pages/BadgesPage';
import MiniAdminsPage from './pages/MiniAdminsPage';
import GamesPage from './pages/GamesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserDetailPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="posts/:id" element={<PostDetailPage />} />
          <Route path="badges" element={<BadgesPage />} />
          <Route path="mini-admins" element={<MiniAdminsPage />} />
          <Route path="games" element={<GamesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;