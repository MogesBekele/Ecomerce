import React, { useContext } from 'react';
import AppContext from '../Context';

function Cart() {
  const { cart, setCart } = useContext(AppContext);

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const itemIndex = updatedCart.findIndex(item => item._id === id);
  
      if (itemIndex !== -1) {
        if (updatedCart[itemIndex].quantity > 1) {
          // If quantity is more than 1, just decrease the quantity
          updatedCart[itemIndex].quantity -= 1;
        } else {
          // If quantity is 1, remove the item from the cart
          updatedCart.splice(itemIndex, 1);
        }
      }
  
      return updatedCart;
    });
  };
  

  return (
    <div style={{ padding: 20, border: '1px solid black', borderRadius: 10, backgroundColor: '#f9f9f9', width: '80%', margin: '20px auto' }}>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cart.map((item) => (
            <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ flex: 1 }}>
                <img src={`http://localhost:4000/uploads/${item.image}`} alt={item.title} style={{ width: 100, borderRadius: 10 }} />
                <h3>{item.title}</h3>
                <p>Price: ETB {item.price}</p>
                <p>By {item.company}</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: 10, cursor: 'pointer' }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
