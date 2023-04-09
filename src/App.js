import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TweeterNavbar from './components/Navbar';
import { UserProvider } from './providers/UserProviders';
import PostFeed from './components/PostFeed';
import Profile from './components/Profile';
import { MessageProvider } from './providers/MessageProviders';
import EditMessage from './components/EditMessage';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <UserProvider>
      <MessageProvider>
        <BrowserRouter>
          <nav>
            <TweeterNavbar />
          </nav>
          <div id='page'>
            <Routes>
              <Route exact path="/" element={<PostFeed />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/edit-message/:id" element={<EditMessage />} />
              <Route path="/edit-profile/:id" element={<EditProfile />} />
              <Route path="/:id" element={<Profile />} />
            </Routes>
          </div>
        </BrowserRouter>
      </MessageProvider>
    </UserProvider>
  );
}

export default App;
