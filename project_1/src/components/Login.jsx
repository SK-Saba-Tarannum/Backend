import React, {  useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate=useNavigate();
  const [name,setName]=useState("")
  const [role,setRole]=useState("")
  const  [email,setEmail]=useState("")
  const  [password,setPassword]=useState("")
  const  [title,setTitle]=useState("")
  const [qnt,setQnt]=useState()
  const [price,setPrice]=useState(0)
  const [date,setDate]=useState()

  const token = localStorage.getItem('jwtToken'); 

  const data = {
  name: name, 
  email: email,
  role:role,
  password:password,
  title:title,
  qnt:qnt,
  price:price,
  date:date

};

  function submithandler(e){
    e.preventDefault(); 
    console.log(name)
    console.log(email)
    if (!name || !email || !password || !date || !role || !title || !qnt || !price) {
      alert("Please fill in all required fields!");
      return;
    }

    console.log(name, email, password, date); 

    axios.post('http://localhost:3013/login',data,{headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        }}
    )
    .then(res=>{console.log(res.data,"hi saba");
        localStorage.setItem('token', res.data.token);

     })
    .catch(err=>console.log(err));

    if (role === "customer") {
        navigate("/customer");
    } else if (role === "admin") {
        navigate("/admin");
    }
  }
 
  function navi(){
    navigate("/reg")

  }
  
  return (
    <div className='h-80 w-auto flex-col flex items-center justify-center bg-slate-50  border-spacing-2 border-2 border-black-900'>
        <h1 className='text-bold'>login</h1>

        <div className='border-red-300 border-2 w-2/3'>
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
              <label htmlFor="">Enter your password</label>
              <input type="password" value={password} id="password" required onChange={(e) => setPassword(e.target.value)} />
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
              <label htmlFor="">Enter book returning date</label>
              <input type="date" value={date} id="returndate" required onChange={(e) => setDate(e.target.value)} />
            </div>

            <div>
              <button type="submit" >submit</button>
            </div>

          </form>
        </div>
        <h1>if you have not registered,please click on this button </h1>
        <button onClick={()=>navi}> register</button>
      
    </div>
  )
}

export default Login
