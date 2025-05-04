import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const data = {
    name: name,
    email: email,
    role: role,
    password: password
  };

  function submithandler(e) {
    e.preventDefault();
    console.log(name, email, password, role);

    axios
      .post('http://localhost:3014/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));  
  }

  function navi() {
    alert("register succesfully")
    navigate('/');
  }

  return (
    <div className="flex h-screen  justify-center items-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Register📚</h1>
        <form onSubmit={submithandler}>
         
          <div className="mb-2">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required placeholder='Enter your name'
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg"
            />
          </div>

          <div className="mb-2">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Enter your email'
  
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg"
            />
          </div>

          <div className="mb-2">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Enter your password'
  
              className="mt-2 w-full  p-1 border border-gray-400 rounded-lg"
            />
          </div>

          <div className="mb-2">
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 mb-2 w-full p-1 border border-gray-400 rounded-lg"
            >
              <option value="">- Select role -</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>


          <div className="mb-2 text-center">
            <button
               onClick={()=>{navi()}} type="submit"
              className="w-full py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Register
            </button>
          </div>
                    <div className="mb-2">
            <button
              onClick={()=>{navigate('/')}}
              className="w-full py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
          

           
        </form>

      </div>
    </div>
  );
}

export default Register;
