import React, { useEffect, useState } from "react";
import {  BrowserRouter as Router,Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./Admin/component/scenes/dashboard";
import Topbar from "./Admin/component/scenes/global/Topbar";
import Sidebars from "./Admin/component/scenes/global/Sidebars";
import Team from "./Admin/component/scenes/team";
import Invoices from "./Admin/component/scenes/invoices";
import Contacts from "./Admin/component/scenes/contacts";
import Bar from "./Admin/component/scenes/bar";
import Form from "./Admin/component/scenes/form";
import SongsEdit from "./Admin/component/scenes/invoices/songs_edit";
import Line from "./Admin/component/scenes/line";
import Pie from "./Admin/component/scenes/pie";
import FAQ from "./Admin/component/scenes/faq";
import Geography from "./Admin/component/scenes/geography";
import Calendar from "./Admin/component/scenes/calendar/calendar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Admin/component/theme";
import Login from "./Admin/component/Login/Login";
import Register from "./Admin/component/Login/Register";
import { Fragment } from 'react';
import { connect } from "react-redux";
import { loginUser } from './Admin/actions/AuthAdminAction';
import { getAdminProfile } from "./Admin/actions/AuthAdminAction";


export const handleLogin = (setLoggedIn) => {
  setLoggedIn(true);
};

export const handleLogout = (setIsLoggedIn) => {
  setIsLoggedIn(false);
};

function AdminRoutes(props) {
  useEffect(() => {
    // Fetch admin profile when the component mounts
    props.getAdminProfile();
  }, []);
  
  const [theme, colorMode] = useMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebar, setIsSidebar] = useState(true);

  // Conditionally render login if not authenticated
  if (!props.authAdmin.token || props.authAdmin.token === undefined) {
    return <Login /> ; 
  }

  // Once authenticated, render the main application
  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Sidebars isSidebar={isSidebar} />
          <main className="contents">
            <Topbar setIsSidebar={setIsSidebar} setIsLoggedIn={setIsLoggedIn} />
          
              <Switch>
                <Route path="/admin" component={Dashboard} exact />
                <Route path="/registration" component={Register} exact />
                <Route path="/team" component={Team} exact />
                <Route path="/contacts" component={Contacts} exact />
                <Route path="/invoices" component={Invoices} exact />
                <Route path="/form" component={Form} exact />
                <Route path="/songs_edit/:id" component={SongsEdit} exact /> 
                <Route path="/bar" component={Bar} exact />
                <Route path="/pie" component={Pie} exact />
                <Route path="/line" component={Line} exact />
                <Route path="/faq" component={FAQ} exact />
                <Route path="/calendar" component={Calendar} exact />
                <Route path="/geography" component={Geography} exact /> 
                {/* Redirect to dashboard if user is not logged in */}
                <Redirect to="/admin" />
              </Switch>
        
          </main>
          </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

const mapStateToProps = (state) => {
  return {
    authAdmin: state.authAdmin
  };
};

export default connect(mapStateToProps, { getAdminProfile })(AdminRoutes);


