import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'; // Import axios

export default function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      if (!token) {
        setError("Authorization token is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/get-product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the authorization token
          },
        });

        if (!response.data.product) {
          throw new Error("Product not found");
        }

        setProduct(response.data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div  style={{ padding: 10, width:"100%", alignItems:"center",
      textAlign:"center"

    }}>
      {product.image && (
        <img
          src={`http://localhost:4000/uploads/${product.image}`}
          alt={product.title}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
      <div>
        <h1>Product Detail: {product.title}</h1>
        <h2>{product.company}</h2>
        <h2>Price: ETB {product.price}</h2>
        <h2>Description: {product.description}</h2>
        <button
          style={{
            cursor: 'pointer',
            padding: 10,
            backgroundColor: 'black',
            color: 'white',
            border: 'none'
          }}
          onClick={() => { /* Add to cart logic here */ }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
