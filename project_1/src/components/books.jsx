import React, { useState } from 'react';
import axios from 'axios';

function Books() {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publisheddate, setPublisheddate] = useState('');
  const [title, setTitle] = useState('');
  const [qnt, setQnt] = useState('');
  const [price, setPrice] = useState(0);
  
  const data = {
    name: name,
    author: author,
    genre: genre,
    publisheddate: publisheddate,
    title: title,
    qnt: qnt,
    price: price,
  };

  function submithandler(e) {
    e.preventDefault(); 
    const token = localStorage.getItem('token');

    // axios.post('http://localhost:3014/addbooks', data, {
    axios.post('https://backend-6-1co4.onrender.com/addbooks', data, {

      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(res => {
      console.log(res.data, "hi saba");
    })
    .catch(err => console.log(err));

    alert("succesfully added book")
  }
  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg ">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Enter Books Details  📔</h1>

        <form onSubmit={submithandler}>
          <div className="mb-4 flex items-center">
            <select
              name="role"
              id="role"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">- Select Genre -</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Mystery">Mystery</option>
              <option value="Thriller">Thriller</option>
              <option value="Romance">Romance</option>
              <option value="Historical fiction">Historical fiction</option>
              <option value="Biograpgy">Biography</option>
              <option value="Selfhelp">Selfhelp</option>
              <option value="Poetry">Poetry</option>
              
            </select>
          </div>

          <div className="mb-2 flex items-center">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder='Enter Book Name'
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-2 flex items-center">
            <input
              type="text"
              id="author"
              placeholder='Enter Author Name'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-2 flex items-center">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder='Enter Title of Book'
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
              placeholder='Enter Book Quantity'
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
              placeholder='Enter Book Price'
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="date"
              id="date"
              placeholder='Enter Published Date'
              value={publisheddate}
              onChange={(e) => setPublisheddate(e.target.value)}
              required
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> 

          <div className="mb-2">
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

export default Books;

