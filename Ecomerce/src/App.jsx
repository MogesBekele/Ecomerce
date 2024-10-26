import { RouterProvider } from "react-router-dom";
import routes from "./routes.jsx";
import AppContext from "./Context.jsx";
import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Optionally validate the token here
      setToken(storedToken);
    }
  }, []);

  return (
    <AppContext.Provider value={{ 
      cart, setCart, 
      products, setProducts, 
      cartVisible, setCartVisible,
      token, setToken 
    }}>
      <RouterProvider router={routes} />
    </AppContext.Provider>
  );
}

export default App;
