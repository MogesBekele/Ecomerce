import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import AppContext from '../Context';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get userId from URL params
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token
      const response = await fetch(
        `http://localhost:4000/my-product?limit=10&skip=0`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token if required
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // Read error response
        throw new Error(`Failed to fetch products: ${errorText}`);
      }

      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product) => {
    navigate(`/update-product/${product._id}`);
  };

  // Updated deleteProduct function to accept product ID
  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setLoading(true); // Start loading
    try {
      const response = await axios.delete('http://localhost:4000/delete-product', {
        data: { id: productId }, // Pass the productId to the request
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (response.data.success) {
        alert('Successfully deleted');
        setProducts(products.filter(pr => pr._id !== productId)); // Update products
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error("Error deleting product:", error); // Log error for debugging
      alert('Something went wrong: ' + error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (id) {
      fetchProducts();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>My Products</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "calc(33.333% - 20px)",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: "#f9f9f9",
              }}
              className="product-card"
            >
              {product.image && (
                <img
                  src={`http://localhost:4000/uploads/${product.image}`}
                  alt={product.title}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
              )}
              <div style={{ textAlign: "center" }}>
                <h2 style={{ margin: "10px 0" }}>{product.title}</h2>
                <h3 style={{ margin: "10px 0" }}>{product.company}</h3>
                <h4 style={{ margin: "10px 0" }}>Price: ${product.price}</h4>
                <p style={{ margin: "10px 0" }}>{product.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  {token && (
                    <button onClick={() => deleteProduct(product._id)} disabled={loading} style={{
                      flex: 1,
                      cursor: 'pointer',
                      padding: 10,
                      backgroundColor: 'red', // Optional styling for delete button
                      color: 'white',
                      border: 'none',
                      marginRight: "10px"
                    }}>
                      {loading ? 'Deleting...' : 'Delete Product'}
                    </button>
                  )}
                  <button
                    style={{
                      cursor: "pointer",
                      padding: "10px 20px",
                      backgroundColor: "black",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
