import React from "react";
import './Footer.css'
function Footer() {
  return (
    <>
      <footer>
        <div className="follow">
          <h2>FOLLOW</h2>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-telegram"></i>
          <i className="fa-brands fa-linkedin-in"></i>
          <i className="fa-regular fa-browser"></i>
          <p>
            Since 2012, EthiopianClothing.net has proudly curated authentic Ethiopian fashion, blending tradition with elegance. Explore our handpicked collection and embrace the beauty of Ethiopian culture.
          </p>
        </div>
        <div className="terms">
          <div className="police">
            <h2>REFUND POLICY</h2>
            <h2>PRIVACY POLICY</h2>
          </div>
          <h3>TERMS OF SERVICE</h3>
          <p>Sign up to get the latest on sales, new releases and more…</p>
          <div className="input">
            <input type="text" placeholder="Name" />
            <input type="Email" placeholder="Email address" />
          </div>
          <button>SUBMIT</button>
        </div>
      </footer>
      <p className="footer-copyright">
        copyright 2024 &copy; mogesbekele32@gmail.com All Rirht Reserved.
      </p>
    </>
  );
}

export default Footer;
