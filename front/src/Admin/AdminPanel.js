import React, { useEffect } from "react";
import Header from "./component/Navbar/Header";
import Menu from "./component/Navbar/Menu";
import Footer from "./component/Navbar/Footer";
import Home from "./component/Layout/Home";
import Login from "./component/Login/Login";
import Register from "./component/Login/Register";
import { connect } from "react-redux";
import { getAdminProfile } from "./actions/AuthAdminAction";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./component/Layout/Profile";
import userTable from './component/Layout/CustomerTable'
import {getItemAdmin} from './actions/GetItemAdmin'
import FoodTable from './component/Layout/FoodTable'
import AdminTable from './component/Layout/AdminTable'
const AdminPanel = props => {
  const getAllItems = async () => {
    await props.getAdminProfile();
    await props.getItemAdmin();
  }
  

  useEffect(() => {
    getAllItems()
  }, []);

  

  if (!props.authAdmin.token || props.authAdmin.token === undefined ) {
    
    return <Login/>;
  } else {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Menu />
            <Home></Home>
            <Route path="/register" component={Register} exact />
            <Route path="/profile" component={Profile} exact />
            <Route path="/CustomerTable" component={userTable} exact />
            <Route path="/FoodTable" component={FoodTable} exact />
            <Route path="/AdminTable" component={AdminTable} exact />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};
const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  { getAdminProfile ,getItemAdmin}
)(AdminPanel);
