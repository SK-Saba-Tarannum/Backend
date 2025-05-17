import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [student,setStudent]=useState([])
    const navigate=useNavigate()

    axios.get('http://localhost:3013/allbooks')
    // axios.get('https://backend-6-1co4.onrender.com/allbooks')

        .then(res => {
          setStudent(res.data);
        })
        .catch(err => {
          console.log('Error fetching customer data:', err);
    });
    function sign(){
        navigate("/reg")
    }
    function login(){
        navigate("/")
    }
      
  return (
    <div className='p-5 h-full w-full bg-gray-100'>
        <div className='flex flex-row justify-between px-3 py-4'>
            <h1 className='font-sans text-4xl font-bold  text-purple-700'>Dashboard</h1>
            <div className='flex gap-2'>
            <button
                className='bg-purple-600 text-white h-10 w-24 rounded-full p-1 text-center hover:bg-blue-700 transition-all duration-300'
                onClick={() => { sign(); }} >
                Sign Up
            </button>
            <button
                className='bg-purple-600 text-white h-10 w-24 rounded-full p-1 text-center hover:bg-blue-700 transition-all duration-300'
                onClick={() => { login(); }} >
                Login
            </button>
            </div>
        </div>

        <div className='flex justify-center items-center mt-10'>
            <table className='w-11/12 md:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden'>
            <thead className='bg-purple-600 text-white'>
                <tr>
                <th className='p-2 text-lg font-semibold'>Title</th>
                <th className='p-2 text-lg font-semibold'>Number</th>
                <th className='p-2 text-lg font-semibold'>Price</th>
                <th className='p-2 text-lg font-semibold'>Rented Books</th>
                <th className='p-2 text-lg font-semibold'>Remaining Books</th>
                </tr>
            </thead>
            <tbody>
                {student.map((num) => (
                <tr key={num.title} className='hover:bg-gray-100 border-b border-gray-400'>
                    <td className='p-3  font-bold'>{num.title}</td>
                    <td className='p-3'>{num.number}</td>
                    <td className='p-3'>{num.price}</td>
                    <td className='p-3'>{num.rentedbooks}</td>
                    <td className='p-3'>{num.remaining_books}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>


  )
}

export default Dashboard
