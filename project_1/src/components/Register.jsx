import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name,setName]=useState("")
  const  [email,setEmail]=useState("")
  const [role,setRole]=useState("")
  const [password,setPassword]=useState("")

  const navigate=useNavigate();

  const data = {
  name: name, 
  email: email,
  role:role,
  password:password
  };

  function submithandler(e){
    e.preventDefault(); 
    console.log(name,email,password,role)
    // console.log(email)
    axios.post('http://localhost:3013/register',data,{headers: {
          'Content-Type': 'application/json',
        }})
    .then(res=>{
      console.log(res.data  );
      })
    .catch(err=>console.log(err));
  }

  function navi(){
    navigate("/")
  }
  
  return (
    
    <div>
      <h1>registration</h1>
        <div>
        <form onSubmit={submithandler}>
          <div>
            <label htmlFor="">C$A</label>
            <select name="customer or admin" id="sel"onChange={(e)=>setRole(e.target.value)}>
              <option value={role}>-select-</option>
              <option value="customer">customer</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div>
            <label htmlFor=""> Enter your name:</label>
            <input type="text" id="name" value={name} required onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div>
            <label htmlFor=""> Enter your Email</label>
            <input type="email" value={email} id="email" required onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor=""> Enter your Password</label>
            <input type="password" value={password} id="email" required onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div>
            <button type="submit">submit  </button>
          </div>

        </form>
      </div>
      <h1>if you have already registered,please click on this sign in button</h1>
      <button  onClick={()=>{navi()}}>sign in</button>

      
    </div>
  )
}

export default Register
