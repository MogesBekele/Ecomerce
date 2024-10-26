import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import AppContext from '../Context';
import axios from 'axios';

export default function ProductCard(props) {
  const { cart, setCart, token, products, setProducts } = useContext(AppContext);
  const { _id, title, price, company, image } = props.detail; // Destructure to access properties
  const [loading, setLoading] = useState(false); // Loading state
  const [sold, setSold] = useState(props.detail.sold || false); // State to track if the product is sold
const markAsSold = async () => {
    setLoading(true); // Start loading
    try {
        const response = await axios.post('http://localhost:4000/mark-as-sold', {
            id: _id,
        }, {
            headers: {
                Authorization: 'Bearer ' + token, // Include the token in the request headers
            },
        });

        if (response.data.success) {
            alert('Product marked as sold');
            setSold(true); // Update the sold state
        } else {
            alert('Failed to mark product as sold');
        }
    } catch (error) {
        console.error("Error marking product as sold:", error);
        alert('Something went wrong: ' + error.message);
    } finally {
        setLoading(false); // End loading
    }
};

  return (
    <div className='grid-container-list' style={{ width: 320, padding: 10, borderRadius: 10, boxShadow: '-7px 16px 15px -3px rgba(0,0,0,0.1)', display: "flex", textAlign: "center", margin: "auto", flexDirection: "column", flexWrap: "wrap" }}>
      {image && <img style={{ width: '100%', borderRadius: 10 }} src={`http://192.168.178.89:4000/uploads/${image}`} alt={title} />}
      <h2 style={{marginTop:"10px"}}>{title}</h2>
      <p style={{ marginTop: 15 }}>ETB {price}</p>
      <p style={{ fontSize: 12, marginBottom:'10px', marginTop:'10px' }}>By {company}</p>
      <div style={{ display: 'flex', width: '100%', gap: 10 }}>
        <Link to={`/productDetails/${_id}`} style={{
          flex: 1,
          padding: 10,
          textAlign: 'center',
          backgroundColor: 'none',
          border: '1px solid black',
          color: 'black',
          textDecoration: 'none',
        }}>
          See Detail
        </Link>

        <button style={{
          flex: 1,
          cursor: 'pointer',
          padding: 10,
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
        }} onClick={() => { setCart([...cart, props.detail]) }}>
          Add To Cart
        </button>

        {token && !sold && (
          <button onClick={markAsSold} disabled={loading} style={{
            flex: 1,
            cursor: 'pointer',
            padding: 10,
            backgroundColor: 'green', // Styling for sold button
            color: 'white',
            border: 'none',
          }}>
            {loading ? 'Marking...' : 'Mark as Sold'}
          </button>
        )}

        {sold && (
          <button style={{
            flex: 1,
            cursor: 'not-allowed',
            padding: 10,
            backgroundColor: 'gray', // Styling for sold button
            color: 'white',
            border: 'none',
          }} disabled>
            Sold
          </button>
        )}
      </div>
    </div>
  );
}
