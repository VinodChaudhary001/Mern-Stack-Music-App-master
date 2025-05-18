import React from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { LeftMenu } from "./Components/LeftMenu";

import MainContainer from "./Components/MainContainer";
// import { RightMenu } from "./Components/RightMenu";
import { Fragment } from 'react';
// import ScrollButton from "./Components/ScrollButton";
// import BottomButton from "./Components/BottomButton";
import Search from "./Components/Search";
import Artist from "./Components/Artist";
import AudioPlayer from "./Components/Albums";
import Liked from "./Components/Liked";
import { Songs } from "./Components/Songs";
import Register from "./Admin/component/Login/Register";
import Team from "./Admin/component/scenes/team"


function UserRoutes() {

        return (
          <div className="App">
         
            <Fragment>
            <Router>
             
            <LeftMenu></LeftMenu>
          
      ,  
            <Switch>
           <Route exact path="/">
           <MainContainer /> 
           </Route>
           <Route path="/search">
           <Search />
           
        
           
           </Route>
           <Route path="/artist">
               <  Artist/>
           </Route>
           <Route path="/albums">
           <AudioPlayer tracks={Songs} />
           </Route>
           <Route path="/liked">
               <Liked/>
           </Route>
       </Switch>
        
        </Router>
            </Fragment>
          
      
      
      
            <div className="background"></div>
          </div>
    );
  }
  export default UserRoutes;
