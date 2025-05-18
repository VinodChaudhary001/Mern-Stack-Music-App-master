import React, { useState, useEffect } from "react";
import "../styles/fav.css";

const Cart = ({ cart, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
   
  };



  return (
    <article>
      {cart.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item. imgSrc} alt="" />
            <p>{item.songName}</p>
          </div>
          <div>
       
          </div>
          <div>
         
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        </div>
      ))}
    
    </article>
  );
};

export default Cart;

