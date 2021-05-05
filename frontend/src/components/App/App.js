import React, { useState } from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Journal from '../Journal/Journal';
import Login from '../Login/Login';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
          <Switch>
          <Route path="/journal">
            <Journal />
          </Route>       
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;