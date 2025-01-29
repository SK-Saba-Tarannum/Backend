// import React, { useState } from 'react'
// import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';


// function Booksdetails() {
//   const [books,setBooks]=useState([])
// //   const navigate=useNavigate()

//   const token = localStorage.getItem('token'); // Retrieve the token from localStorage
//     console.log(token);
    
//     if (token) {
//       axios.get('http://localhost:3013/books', {
//         headers: {
//           'Authorization': `Bearer ${token}` // Include the token in the Authorization header
//         }
//       })
//         .then(res => {
//           setBooks(res.data);
//         })
//         .catch(err => {
//           console.log('Error fetching customer data:', err);
//         });
//     } else {
//       console.log("No token found.");
//     };

// //   function edit(id){
// //     navigate(`/update/${id}`)
    
// //   }
// //   async function dele(id) {
// //   try {
// //     await axios.delete(`http://localhost:3013/delete/${id}`);
// //     setStudent(prevState => prevState.filter(student => student.id !== id));
// //   } catch (err) {
// //     console.error("Error deleting student:", err);
// //   }
// // }

//   return (
//     <div>
//         <h1>hi iam  book section </h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>rented_books	</th>
//               <th>rented_to	</th>
//               <th>remaining_books</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book)=>
//               <tr key={book.title}>
//                 <td>{book.title}</td>
//                 <td>{book.Rentedbooks}</td>
//                 <td>{book.rented_to}</td>
//                 <td>{book.remaining_books}</td>
//               </tr>

//             )}
//           </tbody>
//         </table>

//     </div>
//   )
// }

// export default Booksdetails














import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Booksdetails() {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:3013/books', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
      .then(res => {
        setBooks(res.data); 
      })
      .catch(err => {
        console.error('Error fetching books:', err);
      });
    } 
  }, [token]);

  return (
    <div>
      <h1>Books Section</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Rented To</th>

            <th>total books</th>
            <th>Rented Books</th>
            <th>Remaining Books</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.rented_to}</td>

              <td>{book.number}</td>
              <td>{book.rentedbooks}</td>
              <td>{book.remaining_books}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Booksdetails;
