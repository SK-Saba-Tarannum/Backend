import React, {  useState } from 'react';
import axios from 'axios';

function Customer() {
  const [student, setStudent] = useState([]);
  
  const token = localStorage.getItem('token'); 
    console.log(token);
    
    if (token) {
      axios.get('https://backend-10-r95y.onrender.com/customer', {
      // axios.get('https://backend-6-1co4.onrender.com/customer',{
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

  
  return (
      <div className="min-h-screen flex justify-center  bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg h-80 w-full mt-10 max-w-6xl ">
        <h1 className="text-3xl font-bold text-start  text-purple-600 mb-6">Welcome {student.name}...</h1>
        
        <table className="w-full table-auto mt-20 border-2 border-purple-950 rounded-lg">
          <thead>
            <tr className="bg-purple-600 text-white rounded-sm">
              <th className="p-2 text-left border-gray-400">Id</th>
              <th className="p-2 text-left border-gray-400">Role</th>
              <th className="p-2 text-left border-gray-400">Name</th>
              <th className="p-2 text-left border-gray-400">Email</th>
              <th className="p-2 text-left border-gray-400">Password</th>
              <th className="p-2 text-left border-gray-400">Title</th>
              <th className="p-2 text-left border-gray-400">Quantity</th>
              <th className="p-2 text-left border-gray-400">Price</th>
              <th className="p-2 text-left border-gray-400">Purchased At</th>
              <th className="p-2 text-left border-gray-400">Return Date</th>
            </tr>
          </thead>
          <tbody>
            {/* {student.map((stu) => ( */}
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="p-2 border-gray-600">{student.id}</td>
                <td className="p-2 border-gray-600">{student.role}</td>
                <td className="p-2 border-gray-600">{student.name}</td>
                <td className="p-2 border-gray-400">{student.email}</td>
                <td className="p-2 border-gray-400">{student.password}</td>
                <td className="p-2 border-gray-400">{student.title}</td>
                <td className="p-2 border-gray-400">{student.quantity}</td>
                <td className="p-2 border-gray-400">{student.price}</td>
                <td className="p-2 border-gray-400">{student.createdat}</td>
                <td className="p-2 border-gray-400">{student.returndate}</td>
              </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default Customer;
