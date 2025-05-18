// App.js

import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import { Provider } from "react-redux";
import store from "./store"; // Import your Redux store

function App() {
  return (
    <div className="">
      <Router>
        <Provider store={store}> 
        {/* Wrap your entire application with the Provider */}
          <Switch>
            <Route exact path="/">
              <UserRoutes/> 
            </Route>
            <Route path="/admin">
              <AdminRoutes/> 
            </Route>
          </Switch>
        </Provider>
      </Router>
      <div className="background"></div>
    </div>
  );
}

export default App;
