import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function Customerdetails() {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [bookname, setBookname] = useState('');
  const [qnt, setQnt] = useState(0);
  const [price, setPrice] = useState(0);
  const [renteddate, setRenteddate] = useState('');
  const [returningdate, setReturningdate] = useState('');

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const data = {
    name,
    author,
    genre,
    bookname,
    qnt,
    price,
    renteddate,
    returningdate
  };

  const submithandler = (e) => {
    e.preventDefault();
    if (!token) {
      alert("You're not authenticated. Please log in first.");
      return;
    }

    axios.post('http://localhost:3014/newcustomer', data, {
    // axios.post('https://backend-6-1co4.onrender.com/newcustomer', data,{

      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(res => {
      console.log("Customer created:", res.data);
    })
    .catch(err => {
      console.error("Error creating customer:", err.response?.data || err.message);
    });
    navigate(`/singlecustomer/${name}`);

  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg ">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Enter Details 🙋 </h1>

        <form onSubmit={submithandler}>
          <div className="mb-2 flex items-center">
            <input
              type="text"
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              placeholder='Enter your Name'
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-2 flex items-center">
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">- Select genre-</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Mystery">Mystery</option>
              <option value="Thriller">Thriller</option>
              <option value="Romance">Romance</option>
              <option value="Historical fiction">Historical fiction</option>
              <option value="Biography">Biography</option>
              <option value="Selfhelp">Selfhelp</option>
              <option value="Poetry">Poetry</option>
            </select>
          </div>

          <div className="mb-2 flex items-center">
            <select
              id="bookname"
              value={bookname}
              onChange={(e) => setBookname(e.target.value)}
              required 
            
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">- Select a Book -</option>
              <option value="Adventure">Adventure</option>
              <option value="Journey">Journey</option>
              <option value="Mystery">Mystery</option>
              <option value="Science">Science</option>
              <option value="AI">AI</option>
              <option value="Rome">Rome</option>
              <option value="Cooking">Cooking</option>
              <option value="Habit">Habit</option>
              <option value="Mindset">Mindset</option>
              <option value="Transformation">Transformation</option>
              <option value="Ocean">Ocean</option>
              <option value="Psychology">Psychology</option>
              <option value="Happiness">Happiness</option>
              <option value="Space">Space</option>
              <option value="Spices">Spices</option>
              <option value="Revolutionary">Revolutionary</option>
              <option value="Robots">Robots</option>
              <option value="Future">Future</option>
              <option value="Kingdom">Kingdom</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div className="mb-2 flex items-center">
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              placeholder='Author name'
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-2 flex items-center">
            <input
              type="number"
              id="qnt"
              value={qnt}
              onChange={(e) => setQnt(e.target.value)}
              required
              placeholder='Enter book quantity'
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-2 flex items-center">
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder='Enter price'
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-2 flex items-center">
            <input
              type="date"
              id="renteddate"
              value={renteddate}
              onChange={(e) => setRenteddate(e.target.value)}
              required 
              placeholder='Enter rented date'
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-3 flex items-center">
            <input
              type="date"
              id="returningdate"
              value={returningdate}
              onChange={(e) => setReturningdate(e.target.value)}
              required 
              placeholder='Enter returning date'
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Customerdetails;

