import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Admin() {
  const [student,setStudent]=useState([])
  const navigate=useNavigate()

  const token = localStorage.getItem('token'); 
    console.log(token);
    
    if (token) {
      axios.get('https://backend-10-r95y.onrender.com/admin', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
        .then(res => {
          setStudent(res.data);
        })
        .catch(err => {
          console.log('Error fetching customer data:', err);
        });
    } else {
      console.log("No token found.");
    };

  function edit(id){
    navigate(`/update/${id}`)
    
  }
  function books(){
    navigate("/booksdetails")
  }
  
  async function dele(id) {
  try {
    await axios.delete(`https://backend-10-r95y.onrender.com/delete/${id}`);
    setStudent(prevState => prevState.filter(student => student.id !== id));
  } catch (err) {
    console.error("Error deleting student:", err);
  }
}

  return (
    
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full p-5">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Hi, Admin</h1>
        
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-2">Id</th>
              <th className="p-2">Role</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Password</th>
              <th className="p-2">Title</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Price</th>
              <th className="p-2">Purchased At</th>
              <th className="p-2">Return Date</th>
              <th className="p-2">Edit</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {student.map((num) => (
              <tr key={num.id} className="border-b border-gray-500 hover:bg-gray-50">
                <td className="p-2">{num.id}</td>
                <td className="p-2">{num.role}</td>
                <td className="p-2">{num.name}</td>
                <td className="p-2">{num.email}</td>
                <td className="p-2">{num.password}</td>
                <td className="p-2">{num.title}</td>
                <td className="p-2">{num.quantity}</td>
                <td className="p-2">{num.price}</td>
                <td className="p-2">{num.createdat}</td>
                <td className="p-2">{num.returndate}</td>
                <td className="p-2">
                  <button
                    onClick={() => edit(num.id)}
                    className="px-4 py-1 bg-green-400 text-white rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => dele(num.id)}
                    className="px-4 py-1 bg-red-400 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-center">
          <button
            onClick={books}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            View Rental Details
          </button>
        </div>
      </div>
    </div>

  )
}

export default Admin

