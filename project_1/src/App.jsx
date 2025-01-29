import './App.css';
import React from "react";
import  Admin from './components/Admin';
import Customer from './components/Customer';
import Login from './components/Login';
import Update from './components/Update';

import  Register from './components/Register';


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Booksdetails from './components/booksdetails';

function App() {
  return (
    <div className="App">
      <h1>hi saba</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booksdetails" element={<Booksdetails/>} />

        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
