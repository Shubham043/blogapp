import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './SignIn.css';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
   
    e.preventDefault();
    axios.post('https://electro-bkend.onrender.com/api/users/logIn', { email, password }, {
        
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
      .then(response => {
        // handle successful login
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        navigate('/bloglist');
        console.log(response.data);
      })
      .catch(error => {
        // handle login failure
        setError('Invalid email or password.');
        console.error('Error logging in:', error);
      });
};


  return (
    <div className="container">
      <form >
        <div className="ques">
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        </div>
        <button onClick={handleSubmit} type="submit"> login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <span>don't have an account</span> <a href="/">Sign In here</a>.
    </div>
  );
}

export default Login;
