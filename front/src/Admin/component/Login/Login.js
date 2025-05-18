import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import { LoginUser } from '../../actions/AuthAdminAction';
import { connect } from 'react-redux';
import axios from "axios";

const Login = (props) => {
  const history = useHistory();
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const User = {username:username,password:password}
    await props.LoginUser(User)
    window.location.reload();
    
}
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // const userData = { user, password };
  //   // await LoginUser(userData);
  //   // setIsLoggedIn(true);
  //   // history.push('/dashboard');
  //   try {
  //     const {data} = await axios.post('http://localhost:4000/api/login', {username,password});
  //     setUser(data);
  //     alert('Login successful');
  //     // setRedirect(true);
  //     setIsLoggedIn(true);
  //     // history.push('/admin');
  //     window.location.reload();
  //   } catch (e) {
  //     alert('Login failed');
  //   }
  // };
 
  return (
    <div className="login">
      <div className="login-triangle"></div>
      <h2 className="login-header">Admin Login</h2>
      <form className="login-container" onSubmit={handleSubmit}>
        <p><input type="text" placeholder="User" value={username} onChange={(e) => setUser(e.target.value)} /></p>
        <p><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></p>
        <p><input type="submit" value="Log in" /></p>
        <span>
          New User? <Link to="/registration">Register</Link>.
        </span>
      </form>
   
    </div>
  );
};

// const mapDispatchToProps = {
//   loginUser,
// };

// export default connect(null, mapDispatchToProps)(Login);
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps,{LoginUser})(Login);
