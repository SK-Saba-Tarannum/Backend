import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Getcustomers() {
  const [customers, setCustomers] = useState([]);
  const navigate=useNavigate();

  const token = localStorage.getItem('token'); 
    // console.log(token);
    
    if (token) {
      axios.get('http://localhost:3014/allcustomer', {
      // axios.get('https://backend-6-1co4.onrender.com/allcustomer',{

        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
        .then(res => {
          setCustomers(res.data);
        })
        .catch(err => {
          console.log('Error fetching customer data:', err);
        });
    } else {
      console.log("No token found.");
    };
    function edit(id){
        navigate(`/updatecustomer/${id}`)
    }
    function dele(id){
      axios.delete(`http://localhost:3014/deletecustomer/${id}`, {
      // axios.delete(`https://backend-6-1co4.onrender.com/deletecustomer/${id}`,{

        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log('Error fetching customer data:', err);
        });
  
    }


  
  return (
      <div className="min-h-screen flex justify-center  bg-gray-100 p-5">
      <div className="bg-white p-4 rounded-lg shadow-lg h-full w-full mt-5 max-w-6xl ">
                
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Customer Details 

        <span className='text-6xl text-black'>🧑‍💻</span>
        </h1>
        <button className="px-4 py-1 bg-green-400 text-white text-base rounded hover:bg-green-600"
          onClick={()=>{navigate("/books")}}>Add books  📕 </button>
        <button className=" ml-4 px-4 py-1 bg-orange-400 text-white rounded hover:bg-orange-600" onClick={()=>{navigate('/getbooks')}}>Booksdetails  🧾</button>
        <button className=" ml-4 px-4 py-1 bg-blue-400 text-white rounded hover:bg-blue-600" onClick={()=>{navigate('/booksdetails')}}>Rentaldetails 
      👧  </button>

        <table className="w-full table-auto mt-10 border-2 border-purple-950 rounded-lg">
          <thead>
            <tr className="bg-purple-600 text-white text-center rounded-sm">
              <th className="p-2 text-left border-gray-400">Id</th>
              <th className="p-2 text-left border-gray-400">Name</th>
              <th className="p-2 text-left border-gray-400">Bookname</th>
              <th className="p-2 text-left border-gray-400">Author</th>
              <th className="p-2 text-left border-gray-400">Title</th>
              <th className="p-2 text-left border-gray-400">Quantity</th>
              <th className="p-2 text-left border-gray-400">Price</th>
              <th className="p-2 text-left border-gray-400">Purchased At</th>
              <th className="p-2 text-left border-gray-400">Return Date</th>
            <th className="p-2 text-left border-gray-400">Edit</th>
            <th className="p-2 text-left border-gray-400">Delete</th>


            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b text-center hover:bg-gray-50">
                <td className="p-2 border-gray-600">{customer.id}</td>
                <td className="p-2 border-gray-600">{customer.name}</td>
                <td className="p-2 border-gray-400">{customer.bookname}</td>
                <td className="p-2 border-gray-400">{customer.author}</td>
                <td className="p-2 border-gray-400">{customer.genra}</td>
                <td className="p-2 border-gray-400">{customer.quantity}</td>
                <td className="p-2 border-gray-400">{customer.price}</td>
                <td className="p-2 border-gray-400">{customer.renteddate}</td>
                <td className="p-2 border-gray-400">{customer.returningdate}</td>
                <td className="p-2">
                  <button
                    onClick={() => edit(customer.id)}
                    className="px-4 py-1 bg-green-400 text-white rounded hover:bg-green-600"
                  >🖊️ Edit
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => dele(customer.id)}
                    className="px-4 py-1 bg-red-400 text-white rounded hover:bg-red-600"
                  >
                    ❌ delete
                  </button>
                </td>
              
                </tr>
            ))} 
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default Getcustomers;



