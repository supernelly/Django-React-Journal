import React from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Journal from '../Journal/Journal';
import Login from '../Login/Login';
import Register from '../Register/Register';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();
  
  if(!token || token === "undefined") {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Login setToken={setToken} />
          </Route>
          </Switch>
      </BrowserRouter>
      )
  }
  
  return (
    <div className="wrapper">
      <Journal />
    </div>
  );
}

export default App;