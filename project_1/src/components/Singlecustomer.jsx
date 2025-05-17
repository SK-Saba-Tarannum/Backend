
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Singlecustomer() {
  const [customer, setCustomer] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3014/singlecustomer/${name}`)
    // axios.get(`https://backend-6-1co4.onrender.com/singlecustomer/${name}`)

      .then(res => {
        setCustomer(res.data); 
      })
      .catch(err => {
        console.error('Error fetching customer data:', err);
      });
  }, [name]); 

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg h-auto w-full mt-10 max-w-6xl">
        <h1 className="text-3xl font-bold text-start text-purple-600 mb-6">
          Welcome {name}...💐
        </h1>

        <table className="w-full table-auto mt-20 border-2 border-purple-950 rounded-lg">
          <thead>
            <tr className="bg-purple-600 text-white rounded-sm">
              <th className="p-2 text-left">Id</th>
              <th className="p-2 text-left">Customer Name</th>
              <th className="p-2 text-left">Book Name</th>
              <th className="p-2 text-left">Genre</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Rented Date</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Returning Date</th>
            </tr>
          </thead>
          <tbody>
            {customer.map((cust) => (
              <tr key={cust.id}>
                <td className="p-2">{cust.id}</td>
                <td className="p-2">{cust.name}</td>
                <td className="p-2">{cust.bookname}</td>
                <td className="p-2">{cust.genra}</td>
                <td className="p-2">{cust.price}</td>
                <td className="p-2">{cust.renteddate}</td>
                <td className="p-2">{cust.quantity}</td>
                <td className="p-2">{cust.returningdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Singlecustomer;

