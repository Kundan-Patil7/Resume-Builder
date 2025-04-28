import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Login from './Pages/Auth/Login';
// import SignUp from './Pages/Auth/SignUp';
import Dashboard from './Pages/Home/Dashboard';
import EditResume from './Pages/ResumeUpdate/EditResume';
import { Toaster } from 'react-hot-toast';
import LandingPage from './Pages/LandinPage';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
         
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume/:resumeId" element={<EditResume />} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontSize: '13px',
          },
        }}
      />
    </>
  );
};

export default App;
