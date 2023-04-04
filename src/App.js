import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import TweeterNavbar from './Navbar';
import { UserProvider } from './providers/UserProviders';
import PostFeed from './PostFeed';


function App() {
  return (
    <UserProvider>
      <div>
        <BrowserRouter>
          <nav>
            <TweeterNavbar />
          </nav>
          <Routes>
            <Route exact path="/" element={<PostFeed />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
