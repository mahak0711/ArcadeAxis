import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import HomePage from './pages/HomePage';
import GameDetailPage from './games/GameDetail';
import Header from './Layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookmarksPage from './pages/BookmarksPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <div className="app-container">
      <div className="content-container">
        <SignedIn>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<GameDetailPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/profile" element={<ProfilePage />} />

          </Routes>
        </SignedIn>

        <SignedOut>
          <RedirectToSignIn redirectUrl={window.location.pathname} />
        </SignedOut>
      </div>
    </div>
  );
}

export default App;
