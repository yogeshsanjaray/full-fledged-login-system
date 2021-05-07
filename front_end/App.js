import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter,Switch,Route,Link} from "react-router-dom"

import UserLogin from "./class/may5_authenticate_IMP/login"

import ValidateRegister from "./class/may6_validate_form/validateRegister"
import Members from './class/may6_validate_form/members';
import UserProfile from './class/may6_validate_form/userProfile';

function App() {
    
  return (
    <div>
      <BrowserRouter>
        <Link to="register">Register</Link><br/>
        <Link to="login">Login</Link><br/>
        <Link to="members">Members</Link><br/>
        {/* <Link to="member">Member</Link><br/> */}
        <Link to="userprofile">User Profile</Link><br/>

        <Route path="/routerender" render= {() =>{
          return(<h1>I came from render</h1>)
        }}>
        </Route>

        <Route path="/register">
          <ValidateRegister/>
        </Route>
        <Route path="/login">
          <UserLogin/>
        </Route>
        <Route path="/members">
          <Members/>
        </Route>
        <Route path="/userprofile">
          <UserProfile/>
        </Route>

        {/* <PrivateRoute path="/member">
          <Member/>
        </PrivateRoute> */}
      </BrowserRouter>

    </div>
  );
}
export default App;