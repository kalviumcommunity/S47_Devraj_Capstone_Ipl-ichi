import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;