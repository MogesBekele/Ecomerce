import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from "../Components/productCard";
import AppContext from "../Context";

export default function Home() {
  const { setProducts, products, token } = useContext(AppContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login'); // Redirect to login if token is missing
      return;
    }

    try {
      const response = await axios.get('http://localhost:4000/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data); // Successfully retrieved user data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If 401 Unauthorized, redirect to login
        navigate('/login');
      } else {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.178.89:4000/all-products', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        console.log(response.data); // Log full response to debug

        if (response.data.products) {
          setProducts(response.data.products);
        } else {
          console.error("Products not found in response");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (token) {
      fetchProducts();
    }
  }, [setProducts, token]);

  return (
    <div className="grid-container">
      {products && products.length > 0 ? (
        products.map(product => (
          <ProductCard key={product._id} detail={product} />
        ))
      ) : (
        <h2>No products available</h2>
      )}
    </div>
  );
}
