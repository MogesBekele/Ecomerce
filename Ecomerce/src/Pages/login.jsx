import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppContext from '../Context';

export default function Login() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://192.168.178.89:4000/login",  {
        username: event.target.username.value,
        password: event.target.password.value,
      });

      console.log(response.data); // Log the response data

      if (response.data.success) {
        alert('Successfully logged in');
        localStorage.setItem("token", response.data.token);
        console.log("Token stored:", response.data.token); // Log the stored token
        setToken(response.data.token);
        navigate('/');
      } else {
        alert('Incorrect username or password');
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error); // Log detailed error info
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="container">
    <h4>Log In</h4>
    <form onSubmit={onSubmit}>
      <div>
        <label>username:</label>
        <input
          type="text"
          placeholder="Enter Your username"
          name="username"
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"  // Changed to password type for security
          placeholder="Enter Your Password"
          name="password"
          
          required
        />
      </div>
      
      <button type="submit" style={{cursor:"pointer"}}>Submit</button>
    </form>
    <div>
      <span>Don't have Account?</span>
      <Link to="/register">Sign Up</Link>
    </div>
  </div>
  );
}
