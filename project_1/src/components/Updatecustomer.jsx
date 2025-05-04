import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// const {id}=useParams
function Updatecustomer() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [bookname, setBookname] = useState('');
  const [qnt, setQnt] = useState('');
  const [price, setPrice] = useState(0);
  const [renteddate, setRenteddate] = useState('');
  const [returningdate, setReturning] = useState('');


//   const [date, setDate] = useState('');

  // const token = localStorage.getItem('jwtToken'); 

  const data = {
    name: name,
    author: author,
    genre: genre,
    bookname:bookname,
    qnt: qnt,
    price: price,
    renteddate:renteddate,
    returningdate:returningdate
    // date: date
  };
  const {id}=useParams()
  function submithandler(e) {
    e.preventDefault(); 
    console.log(name);
    alert("updated customer details")
    axios.put(`http://localhost:3014/updatecustomer/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      console.log(res.data, "hi saba");
    })
    .catch(err => console.log(err));
    navigate("/Getcustomers");
    }
  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg ">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Update User Details🙋  </h1>

        <form onSubmit={submithandler}>
          <div className="mb-2 flex items-center">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder=''
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-2 flex items-center">
            <select
              name="role"
              id="role"

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
              <option value="Biograpgy">Biography</option>
              <option value="Selfhelp">Selfhelp</option>
              <option value="Poetry">Poetry</option>
              
            </select>
          </div>

          <div className="mb-2 flex items-center">
            <input
              type="text"
              id="name"
              value={bookname}
              onChange={(e) => setBookname(e.target.value)}
              required
              placeholder='Enter Book Name'
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-2 flex items-center">
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              placeholder='Enter Author Name'
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

          <div className="mb-2 flex items-center">
            <input
              type="date"
              id="date"
              value={renteddate}
              onChange={(e) => setRenteddate(e.target.value)}
              required
              placeholder='Enter Rented Date'
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> 
          <div className="mb-2 flex items-center">
            <input
              type="date"
              id="date"
              value={returningdate}
              onChange={(e) => setReturning(e.target.value)}
              required
              placeholder='Enter Returning Date'
              className="mt-2 w-full p-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> 


          <div className="mb-6">
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

export default Updatecustomer;

