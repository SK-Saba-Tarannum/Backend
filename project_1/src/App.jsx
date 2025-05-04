import './App.css';
import React from "react";
import  Admin from './components/Admin';
import Customer from './components/Customer';
import Login from './components/Login';
import Updatebooks from './components/Updatebooks';
import Dashboard from './components/Dashboard';
import Books from './components/books'
import  Register from './components/Register';
import  Getbooks from './components/Getbooks';
import  Allbooks from './components/Allbooks';

import  Customerdetails from './components/Customerdetails';
import  Updatecustomer from './components/Updatecustomer';
import  Getcustomers from './components/Getcustomers';
import  Singlecustomer from './components/Singlecustomer';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Booksdetails from './components/booksdetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/books" element={<Books/>} />
          <Route path="/getbooks" element={<Getbooks/>} />
          <Route path="/allbooks" element={<Allbooks/>} />

          <Route path="/update/:id" element={<Updatebooks />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/customerdetails" element={<Customerdetails />} />
          <Route path="/updatecustomer/:id" element={<Updatecustomer />} />
          <Route path="/getcustomers" element={<Getcustomers />} />
          <Route path="/singlecustomer/:name" element={<Singlecustomer />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/booksdetails" element={<Booksdetails/>} />
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
