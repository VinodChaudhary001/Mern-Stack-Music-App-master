import React from "react";
import { Songs } from "./Songs";

 
const Buttons = ({ filterItem, setItem, menuItems }) => {
  return (
    <>
      <div className="btn-container">
        {menuItems.map((song, id) => {
          return (
            <button
              className="filter-btn"
              onClick={() => filterItem(song)}
              key={id}
            >
              {song}
            </button>
          );
        })}
        <button
          className="filter-btn"
          onClick={() => setItem(Songs)}
        >
          All
        </button> 
       </div>
    </>
  );
};
 
export default Buttons;
