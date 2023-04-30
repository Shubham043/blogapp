import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import SignIn from './components/SignIn';
import Login from './components/login';
import PostForm from './components/PostForm';
import BlogList from './components/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bloglist" element={<ProtectedRoutes component={<BlogList />} />} />
        <Route path="/postform" element={<ProtectedRoutes component={<PostForm />} />} />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoutes(props) {
  const path = window.location.pathname;

  if (path === '/') {
    return <>{props.component}</>;
  }

  return (
    <>
      <Navbar />
      {props.component}
    </>
  );
}

export default App;
