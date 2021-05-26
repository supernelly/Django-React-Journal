import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from "axios";

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();

  async function loginUser(credentials) {
    return axios.post("https://afternoon-hamlet-77607.herokuapp.com/api/login/", credentials)
    .then(response => {
      sessionStorage.setItem('username', username);
      setToken(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        if (error.response.data['non_field_errors'][0]) {
          console.log(error.response.data['non_field_errors'][0]);
          setErrorMsg(error.response.data['non_field_errors'][0]);
        }
      }
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    await loginUser({
      username,
      password
    });
  }
  return(
    <div className="container">
      <h1 className="text-black text-uppercase text-center my-4">Login</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <form onSubmit={handleSubmit}>
                <label>
                  <p>Username</p>
                  <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                  <p>Password</p>
                  <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                  <button className="btn btn-primary" type="submit">Submit</button>
                </div>
              </form>
              <span>
                Don't have an account? <Link to="/register">Register</Link>
              </span>
            </div>
            <h3 className="error"> { errorMsg } </h3>
          </div>
        </div>
    </div>
  )
}


Login.propTypes = {
  setToken: PropTypes.func.isRequired
};