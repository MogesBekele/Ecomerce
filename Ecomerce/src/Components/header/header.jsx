import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AppContext from "../../Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { IoClose } from "react-icons/io5";

function Header() {
  const { cart, token, setToken } = useContext(AppContext);
  const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
  const [menu, setMenu] = useState(false);
  
  const menuRef = useRef(null); // Reference for the menu div

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // Optionally remove user ID on logout
    setToken(null);
  }

  const handleMenu = () => {
    setMenu(!menu);
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menu && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu]);

  return (
    <>
      <div className="header">
        <p className="header-title">
          Habesha Tibeb
        </p>

        {/* Conditional rendering for the menu icon and close icon */}
        <div className="menu-icon" onClick={handleMenu}>
          {menu ? (
            <IoClose size={30} color="white" />
          ) : (
            <FontAwesomeIcon icon={faBars} size="lg" color="white" />
          )}
        </div>
        
        <div 
          ref={menuRef} // Attach ref to the menu container
          className={`header-list ${menu ? 'show-menu' : ''}`}
        >
          <Link className="header-link" to="/">Home</Link>

          {!token ? (
            <>
              <Link className="header-link" to="/register">Register</Link>
              <Link className="header-link" to="/login">Login</Link>
            </>
          ) : (
            <>
              <Link className="header-link" to="/product">Add Product</Link>
              <Link className="header-link" to={`/myproduct/${userId}`}>My Product</Link>

              <p
                className="header-logout"
                onClick={logout}
              >
                Logout
              </p>
            </>
          )}
        </div>

        {/* Cart Link stays fixed on the top */}
        <Link
          to="/cart"
          className="cart-link"  // Fix cart link with new class
        >
          Cart: {cart.length}
        </Link>
      </div>
    </>
  );
}

export default Header;
