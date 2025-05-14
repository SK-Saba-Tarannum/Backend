import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Booksdetails() {
  const [books, setBooks] = useState({ data: [], totalPages: 1, totalItems: 0 });
  const [page, setPage] = useState(1);
  const limit = 7;

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // const res = await axios.get(`https://backend-6-1co4.onrender.com/rentaldetails?page=${page}&limit=${limit}`,{

        const res = await axios.get(`http://localhost:3014/rentaldetails?page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Ensure fallback structure if API doesn't return expected fields
        const { data = [], totalPages = 1, totalItems = 0 } = res.data;
        setBooks({ data, totalPages, totalItems });
      } catch (err) {
        console.error('Error fetching books:', err);
        setBooks({ data: [], totalPages: 1, totalItems: 0 }); // prevent undefined on error
      }
    };

    fetchData();
  }, [token, page]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Rental Details <span className='text-4xl'>👨‍🎓📕</span></h1>

        <table className="w-full border text-center">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-3">Title</th>
              <th className="p-3">Rented To</th>
              <th className="p-3">Total Books</th>
              <th className="p-3">Rented Books</th>
              <th className="p-3">Remaining Books</th>
            </tr>
          </thead>
          <tbody>
            {books.data.length > 0 ? (
              books.data.map((book, index) => (
                <tr key={index} className="hover:bg-gray-50 border-b">
                  <td className="p-3">{book.title}</td>
                  <td className="p-3">{book.rented_to || 'None'}</td>
                  <td className="p-3">{book.quantity}</td>
                  <td className="p-3">{book.rentedbooks}</td>
                  <td className="p-3">{book.remaining_books}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-gray-500">
                  No rental records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center gap-2 items-center mt-6   ">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-gray-600 text-white px-2 py-1 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm  font-sans">
            Page {page} of {books.totalPages}
          </span>

          <button
            onClick={() => setPage(prev => Math.min(prev + 1, books.totalPages))}
            disabled={page >= books.totalPages}
            className="bg-gray-500 text-white px-2 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Booksdetails;
