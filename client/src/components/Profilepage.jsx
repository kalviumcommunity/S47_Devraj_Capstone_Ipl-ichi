import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Profilepage.css';

function ProfilePage() {
  const { name: initialName, email: initialEmail } = useParams();
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Function to handle name change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Function to handle email change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send updated name and email to the backend
      const response = await axios.put('http://localhost:3000/updateProfile', { name, email });
      setSuccessMessage(response.data.message);
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  useEffect(() => {
    const email = localStorage.getItem('loggedInUser');
    if (!email) {
      setError('User not logged in');
      setLoading(false);
      return;
    } 
    const fetchProfileData = async () => {
      try {
        // Make a request to your backend API to fetch the user's profile data
        const response = await axios.post('http://localhost:3000/getFirstName', { email });
        if (response.data) {
          setName(response.data.name);
          setEmail(response.data.email);
        } else {
          setError('User data not found');
        }
      } catch (error) {
        setError('Failed to fetch user data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [email]);

  return (
    <div className='package'>
      <div class="package2">
      <h1 className='textt'>User Profile</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {successMessage && <p>{successMessage}</p>}
      {!loading && !error && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={handleNameChange} 
              required 
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={handleEmailChange} 
              required 
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      )}
      </div>
    </div>
  );
}

export default ProfilePage;
