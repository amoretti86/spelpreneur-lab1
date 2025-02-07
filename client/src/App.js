import React, { useState } from 'react';
import axios from 'axios';

function App() {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');

   const handleSubmit = async (e) => {
       e.preventDefault();
       try {
           const response = await axios.post('/submit', { name, email });
           setMessage('User added successfully!');
       } catch (error) {
           setMessage('Error saving user to database');
       }
   };

   return (
       <div>
           <h1>Enter Your Info</h1>
           <form onSubmit={handleSubmit}>
               <div>
                   <label>Name</label>
                   <input
                       type="text"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                   />
               </div>
               <div>
                   <label>Email</label>
                   <input
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                   />
               </div>
               <button type="submit">Submit</button>
           </form>
           {message && <p>{message}</p>}
       </div>
   );
}

export default App;