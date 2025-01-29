
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Admin() {
  const [student,setStudent]=useState([])
  const navigate=useNavigate()

  const token = localStorage.getItem('token'); 
    console.log(token);
    
    if (token) {
      axios.get('http://localhost:3013/admin', {
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
    await axios.delete(`http://localhost:3013/delete/${id}`);
    setStudent(prevState => prevState.filter(student => student.id !== id));
  } catch (err) {
    console.error("Error deleting student:", err);
  }
}

  return (
    <div>
        <h1>hi iam admin</h1>
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
              <th>Purchased at</th>
              <th>Return date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {student.map((num)=>
              <tr key={num.id}>
                <td>{num.id}</td>
                <td>{num.role}</td>
                <td>{num.name}</td>
                <td>{num.email}</td>
                <td>{num.password}</td>
                <td>{num.title}</td>
                <td>{num.quantity}</td>
                <td>{num.price}</td>
                <td>{num.createdat}</td>
                <td>{num.returndate}</td>

                <td><button onClick={()=>{edit(num.id)}}> edit</button></td>
                <td><button onClick={()=>{dele(num.id)}}> delete</button></td>
              </tr>

            )}
          </tbody>
        </table>
        <button onClick={()=>{books()}}> book details</button>

    </div>
  )
}

export default Admin

