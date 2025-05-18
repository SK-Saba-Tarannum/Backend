
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const data = {
    name: name,
    email: email,
    password: password
  };

  function submithandler(e) {
    e.preventDefault();
    console.log(data)

    axios.post('https://backend-10-r95y.onrender.com/login', data, {
    // axios.post('https://backend-6-1co4.onrender.com/login', data,{

      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      const token = res.data.token; 

      if (!token) {
        console.error("No token received from server.");
        return;
      }
      console.log("Response from server:", res.data.token);


      localStorage.setItem('token', token); 

      // console.log("Token before decoding:", token);

      const decoded = jwtDecode(token);
      console.log(decoded)     
      const role = decoded.role;
      console.log(res,role)

      if (role === "customer") {
        console.log("hi")
        navigate("/allbooks");
      } else if (role === "admin") {
        navigate("/getcustomers");
      } else {
        console.log("Unknown role:", role);
      }
    })
    .catch(err => {
      console.log('Login failed:', err);
      alert("Invalid login. Please check your credentials.");
    });
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Login👨‍🎓</h1>

        <form onSubmit={submithandler}>
          <input
            type="text"
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mt-2 p-1 border border-gray-400 rounded-lg"
          />

          <input
            type="email"
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-2 p-1 border border-gray-400 rounded-lg"
          />

          <input
            type="password"
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-2 mb-2 p-1 border border-gray-400 rounded-lg"
          />

          <button
            type="submit"
            className="w-full py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => navigate("/reg")}
            className="w-full py-1 mt-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
