import React, {  useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const navigate=useNavigate();
  const [name,setName]=useState("")
  const [role,setRole]=useState("")
  const  [email,setEmail]=useState("")
  const  [password,setPassword]=useState("")
  const  [title,setTitle]=useState("")
  const [qnt,setQnt]=useState(1)
  const [price,setPrice]=useState(1)
  const [date,setDate]=useState("")
  const {id}=useParams();

  
  const data = {
  name: name, 
  email: email,
  role:role,
  title:title,
  qnt:qnt,
  price:price,
  date:date
};

  function submithandler(e){
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(name)
    console.log(email)
    axios.put(`http://localhost:3013/update/${id}`,data,{headers: {
          'Content-Type': 'application/json',
        }}
    )
    .then(res=>{console.log(res.data,"hi saba");
      })
      .catch(err=>console.log(err));
  }
  
    function navi(){
      navigate("/admin")

    }
  
  
    return (
    <div>
        <h1>update</h1>

        <div>
          <form onSubmit={submithandler}>
            <div>
              <label htmlFor="">C$A</label>
              <select name="customer or admin" id="sel" onChange={e=>setRole(e.target.value)}>
                <option value="">-select-</option>
                <option value="customer">customer</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <div>
              <label htmlFor=""> Enter your name:</label>
              <input type="text" id="name" value={name} required onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>
              <label htmlFor=""> Enter your email</label>
              <input type="email" value={email} id="email" required onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
              <label htmlFor=""> Enter your password</label>
              <input type="password" value={password} id="title" required onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <div>
              <label htmlFor=""> Enter book title</label>
              <input type="text" value={title} id="title" required onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div>
              <label htmlFor=""> Enter book Quantity</label>
              <input type="number" value={qnt} id="qnt" required onChange={(e)=>setQnt(e.target.value)}/>
            </div>
            <div>
              <label htmlFor=""> Enter books prices</label>
              <input type="number" value={price} id="price" required onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <div>
              <label htmlFor=""> Enter book returning date</label>
              <input type="datetime-local" value={date} id="return date"  onChange={(e)=>setDate(e.target.value)}/>
            </div>
            <div>
              <button type="submit" onClick={()=>{navi()}}>update</button>
            </div>

          </form>
        </div>
        
    </div>
  )
}

export default Update
