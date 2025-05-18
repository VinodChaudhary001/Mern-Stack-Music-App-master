import React, { useEffect } from "react";
import "../styles/LeftMenu.css";
import Search from "./Search";
import { BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom'
function Menu({ title, listObject }) {
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

    <div className="menuContainer">
       <Router>
   
  <p>{title}</p>

      <ul>
        {listObject &&
          listObject.map((li) => (
            <li key={li.id}>
               <Link to = {li.path} > 
            
         
                <i>{li.icon}</i>
                <span> {li.name}</span>
                </Link>
            </li>
          ))}
      </ul>
      </Router>
    </div>
  );
}

export { Menu };
