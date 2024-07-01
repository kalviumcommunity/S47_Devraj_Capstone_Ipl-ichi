import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './components/Home';
import Login from './components/Login';
import Profilepage from './components/Profilepage';
import Player from './components/data/Player';
import PlayerData from './components/PlayerData';
import Cart from './components/data/Cart';
import Razorpay from './components/data/Razorpay';
import About from './components/data/About';

function App() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const [showDropdown, setShowDropdown] = useState(false);
  const history = createBrowserHistory(); // Create history object

  const handleLogout = () => {  
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('JWToken');
    history.push('/'); // Redirect to the home route
    window.location.reload();
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  return (
    <Router>
      <nav>
        <div className="center">
        <Link className='home' to="/">Home</Link>
        <Link className='home' to="/about">Generate</Link>
        {loggedInUser ? (
          <>
            <div className="dropdown">
              <button onClick={toggleDropdown} className="dropbtn">Profile</button>
              {showDropdown && (
                <div className="dropdown-content">
                  <Link to="/profile">Profile</Link>
                  <button className='dropbtn' onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link className='home' to="/login">Login</Link>  
        )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/player" element={<Player />} />
        <Route path="/playerdata" element={<PlayerData />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pay" element={<Razorpay />} />
        <Route path='/about' element={<About/>}/>
      </Routes>
    </Router>
  );
}

export default App;
