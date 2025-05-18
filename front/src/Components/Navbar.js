import React from "react";


const Navbar = ({ setShow, size }) => {
  return (
    <nav>
      <div className="nav_box">
        <span style={{color:"red"}} className="my_shop" onClick={() => setShow(true)}>
          My favourite
        </span>
        <div className="cart" onClick={() => setShow(false)}>
          <span>
            <i className="fas fa-cart-plus"></i>
          </span>
          <span style={{color:"red"}}>{size}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;