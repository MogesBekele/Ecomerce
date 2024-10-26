import axios from "axios";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    const firstName = event.target.firstname.value;
    const lastName = event.target.lastname.value;
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (!firstName || !lastName || !username || !password) {
      return alert("Please fill in all fields.");
    }

    try {
      const response = await axios.post("http://localhost:4000/register", {
        first_name: firstName,
        last_name: lastName,
        username,
        password,
      });

      if (response.data.success) {
        alert("Successfully registered");
        navigate("/login");
      } else {
        alert(
          "Registration failed: " + (response.data.message || "Unknown error.")
        );
      }
    } catch (error) {
      console.error("There was an error registering:", error);
      if (error.response) {
        alert(
          "Registration failed: " +
            (error.response.data.message || "Unknown error.")
        );
      } else {
        alert("Network error: Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <h4>Register</h4>
      <form onSubmit={onSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" placeholder="Enter Your Name" name="firstname" />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" placeholder="last Name" name="lastname" />
        </div>
        <div>
          <label>username:</label>
          <input type="text" placeholder="Enter Your username" name="username"  />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            placeholder="Enter Your Password"
            name="password"
            
          />
        </div>
        <button type="submit" style={{cursor:"pointer"}}>Submit</button>
      </form>
      <div className="acount">
        <span>already Have an Account? </span>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
