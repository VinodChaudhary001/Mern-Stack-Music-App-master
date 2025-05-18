import React, { useEffect,useState } from "react";
import "../styles/LeftMenu.css";
import { FaSpotify, FaEllipsisH } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { Menu } from "./Menu";
import { MenuList } from "./MenuList";
import { MenuPlayList } from "./MenuPlayList";
import TrackList from "./TrackList";
import { BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom'

function LeftMenu() {

  useEffect(() => {
    const allLi = document
      .querySelector(".menuContainer ul")
      .querySelectorAll("li");

    function changeMenuActive() {
      allLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    allLi.forEach((n) => n.addEventListener("click", changeMenuActive));
  }, []);
  return (
    <div className="leftMenu">
      <div className="logoContainer">
        <div className="logo">
          <i>
            <FaSpotify />
          </i>

          <h2>Spotify</h2>
        </div>

        <i>
          <FaEllipsisH />
        </i>
      </div>

      <div className="searchBox">
        <input type="text"  placeholder="Search..." />
        <i>
          <BiSearchAlt />
        </i>
      </div>

      {/* <Menu title={"Menu"} listObject={MenuList} /> */}
      <div className="menuContainer">
      <p>Menus</p>
      <ul>
      {MenuList.map((li) => (
            <li key={li.id}>
               <Link to = {li.path} > 
            
         
                <i>{li.icon}</i>
                <span> {li.name}</span>
                </Link>
            </li>
          ))}
     
     
     
     
     </ul>
        </div>

        <MenuPlayList />


   
                      
    </div>
  );
}

export { LeftMenu };
