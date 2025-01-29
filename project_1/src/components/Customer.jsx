import React, {  useState } from 'react';
import axios from 'axios';

function Customer() {
  const [student, setStudent] = useState([]);
  
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    console.log(token);
    
    if (token) {
      axios.get('http://localhost:3013/customer', {
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
    <div>
      <h1>Hi Customer</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Role</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Title</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>purchased at</th>
            <th>Return date</th>
          </tr>
        </thead>
        <tbody>
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.role}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.password}</td>
              <td>{student.title}</td>
              <td>{student.quantity}</td>
              <td>{student.price}</td>
              <td>{student.createdat}</td>
              <td>{student.returndate}</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Customer;
