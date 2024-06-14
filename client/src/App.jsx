import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profilepage from './components/Profilepage';


function App() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const [showDropdown, setShowDropdown] = useState(false);
  // const navigate = useNavigate();

  const handleLogout = () => {  
    localStorage.removeItem('loggedInUser');
    window.location.reload();
    // navigate('/');
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {loggedInUser ? (
          <>
            <div className="dropdown">
              <button onClick={toggleDropdown} className="dropbtn">Profile</button>
              {showDropdown && (
                <div className="dropdown-content">
                  <Link to="/profile">View Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profilepage />} />
      </Routes>
    </Router>
  );
}

export default App;

