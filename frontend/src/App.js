import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import NewRecord from './components/Dashboard/NewRecord';
import ViewAll from './components/Dashboard/ViewAll';
import BulkUpload from './components/Dashboard/BulkUpload';


function App() {
  return (
    <Router>
      <nav className="main-nav">
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/new-record" element={<NewRecord />} />
        <Route path="/view-all" element={<ViewAll />} />
        <Route path="/bulk-upload" element={<BulkUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
