import { useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import {Login} from './components/User/Login';
import {Forgot} from './components/User/Forgot';
import {Register} from './components/User/Register';
import {Profile} from './components/User/Profile';
import {Favourites} from './components/User/Favourites';
import Tracks  from './components/Tracks';
import FreeAuthRoute from "./routes/FreeAuthRoute";
import {ProtectedRoute} from "./routes/ProtectedRoute";
import  TrackDetails from './components/TrackDetails/index';
import  {VideoDetails} from './components/Videos/VideoDetails';
import  {Classroom} from './components/Classroom';
import  JoinedClassroom from './components/Classroom/JoinedClassroom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={ <FreeAuthRoute><Login /></FreeAuthRoute>} />
          <Route exact path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="/following" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="/following/add" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="/followers" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="/edit-profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="/forgot-password" element={<FreeAuthRoute><Forgot /></FreeAuthRoute>} />
          <Route exact path="/register" element={<FreeAuthRoute><Register /></FreeAuthRoute>} />
          <Route exact path="/learning" element={<Tracks />} />
          <Route exact path="/learning/:id" element={<TrackDetails />} />
          <Route exact path="/video/:id" element={<VideoDetails/>} />
          <Route exact path="/my-classroom" element={<Classroom />} />
          <Route exact path="/my-classroom/:code" element={<Classroom />} />
          <Route exact path="/join-classroom" element={<Classroom />} />
          <Route exact path="/join/:code" element={<JoinedClassroom />} />
          <Route exact path="/my-classroom/:classcode/upload-video" element={<Classroom />} />
          <Route exact path="/favourites" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="/watch-later" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="/recent-classroom" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="/classroom/:any" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
