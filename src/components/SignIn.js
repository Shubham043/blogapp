import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

function SignIn() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://electro-bkend.onrender.com/api/users', {
        username,
        email,
        password
      });
      console.log(response.data);
      
      // Check if the response contains a JWT token
      if (response.data.token) {
        // Save the JWT token to local storage
      localStorage.setItem('token', response.data.token);
   
        // Redirect the user to the login page
        navigate('/login');
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="container">
    <div className="ques">
      <input type="text" name="username" className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
      <input type="text" name="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
      <input type="password" name="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
    </div>
    <button type="submit" className="btn" onClick={handleSubmit}>Sign In</button>
    <div className="signup">
      <span>Already have an account!</span> <a href="/login">Log In here</a>.
    </div>
  </div>
  
 
  );
}

export default SignIn;
