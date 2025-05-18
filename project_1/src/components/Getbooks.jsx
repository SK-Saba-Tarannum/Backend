import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Getbooks() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1); // current page
  const [totalPages, setTotalPages] = useState(1); // total pages from backend
  const navigate = useNavigate();

  useEffect(() => {
    // axios.get(`https://backend-6-1co4.onrender.com/allbooks?page=${page}&limit=8`)

    axios.get(`https://backend-10-r95y.onrender.com/allbooks?page=${page}&limit=8`)
      .then(res => {
        setBooks(res.data.data || []); // Safe fallback
        setTotalPages(res.data.totalPages || 1);
      })
      .catch(err => {
        console.log('Error fetching book data:', err);
        setBooks([]); // fallback to avoid crash
      });
  }, [page]);

  function edit(id) {
    navigate(`/update/${id}`);
  }

  function dele(id) {
    axios.delete(`https://backend-10-r95y.onrender.com/deletebook/${id}`)
      .then(() => {
        setBooks(prev => prev.filter(book => book.id !== id));
      })
      .catch(err => {
        console.log('Error deleting book:', err);
      });
  }

  return (
    <div className='p-5 h-full w-full bg-gray-100'>
      <div className='flex flex-col gap-4 justify-center items-center mt-10'>
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Books Details <span className='text-6xl'>📚</span></h1>


        <div className="bg-green-500 text-xl font-bold pl-3 pr-3 p-2 text-white rounded-sm ">
          <button onClick={() => navigate('/books')}>Add books 📓</button>
        </div>

        <table className='w-11/12 md:w-3/4 border-spacing-1 border-black-2 bg-white shadow-lg rounded-lg overflow-hidden'>
          <thead className='bg-purple-600 text-white'>
            <tr>
              <th className='p-2 text-lg font-semibold'>ID</th>
              <th className='p-2 text-lg font-semibold'>Name</th>
              <th className='p-2 text-lg font-semibold'>Title</th>
              <th className='p-2 text-lg font-semibold'>Genre</th>
              <th className='p-2 text-lg font-semibold'>Author</th>
              <th className='p-2 text-lg font-semibold'>Quantity</th>
              <th className='p-2 text-lg font-semibold'>Price</th>
              <th className='p-2 text-lg font-semibold'>Edit</th>
              <th className='p-2 text-lg font-semibold'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className='hover:bg-gray-100 border-b border-gray-400'>
                <td className='p-3'>{book.id}</td>
                <td className='p-3'>{book.name}</td>
                <td className='p-3'>{book.title}</td>
                <td className='p-3'>{book.genra}</td>
                <td className='p-3'>{book.author}</td>
                <td className='p-3'>{book.quantity}</td>
                <td className='p-3'>{book.price}</td>
                <td><button className='p-1 pl-2 pr-2 text-white rounded-sm bg-green-500' onClick={() => edit(book.id)}>🖊️Edit</button></td>
                <td><button className='p-1 pl-2 pr-2 text-white rounded-sm bg-red-500' onClick={() => dele(book.id)}>❌Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className="flex gap-2 mt-4">
          <button
            className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="px-3 py-1">{page} / {totalPages}</span>
          <button
            className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Getbooks;

