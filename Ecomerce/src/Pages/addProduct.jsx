import axios from 'axios';
import React, { useContext, useState } from 'react';
import AppContext from '../Context';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const { token } = useContext(AppContext);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate= useNavigate()

  const submitProduct = async (e) => {
    e.preventDefault();
    
    // Check if token is available
    if (!token) {
      alert('Please login');
      return;
    }

    const form = new FormData();
    const title = e.target.title.value;
    const price = e.target.price.value;
    const company = e.target.company.value;
    const description = e.target.description.value;
    const image = e.target.image.files[0];

    // Log the form data and token
    console.log('Form data:', { title, price, company, description, image });
    console.log('Token:', token);

    form.append('title', title);
    form.append('price', price);
    form.append('company', company);
    form.append('description', description);
    form.append('image', image);
   
    try {
      console.log("Token being sent:", token); // Check the token being sent

      const response = await axios.post('http://localhost:4000/add-product', form, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      // Handle success response
      if (response.data.success) {
        setSuccess('Product added successfully!');
        alert('successfully added')
        setError('');
        e.target.reset(); // Clear the form
        navigate('/')
      } else {
        setError('Failed to add product: ' + (response.data.message || 'Unknown error.'));
      }
    } catch (err) {
      // Improved error handling
      if (err.response) {
        console.error("Server response:", err.response); // Log full error response
        setError('Server error: ' + (err.response.data.message || 'Unknown error.'));
      } else {
        setError('Network error: ' + err.message);
      }
      setSuccess('');
    
    }
  };
  
  
  

  return (
    <form onSubmit={submitProduct}
    className='add-product' style={{
      maxWidth:"600px",
      minwidth: "300px",
      height:"auto",
      margin: "auto",
      display: 'flex',
      flexDirection: 'column',
      gap: 30,
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid brown',
      marginBottom: "30px"
     
    }} >
      <input type="text" name='title' placeholder='Title' required />
      <input type="text" name='company' placeholder='Company' required />
      <input type="number" name='price' placeholder='Price' required />
      <textarea name="description" placeholder='Description' required></textarea>
      <input type="file" name='image' required />
      <input type="submit" value='Add Product' style={{backgroundColor:"brown", border:"none", color:"white", padding:"5px", marginBottom:"20px"}} />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
}

export default AddProduct;
