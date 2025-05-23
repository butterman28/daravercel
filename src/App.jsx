import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Post from './components/post'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostDetail from './components/postdetails';
import Podcast from './components/podcast';
import PodcastDetail from './components/podcastdetails';
function App() {

  return (
  <>
  <Router>
    <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/post" element={<Post/>} />
    <Route path="/post/:id" element={<PostDetail/>} />
    <Route path="/podcast" element={<Podcast/>} />
    <Route path="/podcast/:id" element={<PodcastDetail/>} />
  </Routes>
  </Router>
  </>

  );
}

export default App
