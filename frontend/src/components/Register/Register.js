import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";



export default function Register() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();
  let history = useHistory();

  async function registerUser(credentials) {
    return axios.post("https://afternoon-hamlet-77607.herokuapp.com/api/register/", credentials)
    .then(response => {
      // Redirect here
      history.push("/");
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        if (error.response.data['username'][0]) {
          console.log(error.response.data['username'][0]);
          setErrorMsg(error.response.data['username'][0]);
        }
      }
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    await registerUser({
      username,
      password
    });
  }

  return(
    <div className="container">
      <h1 className="text-black text-uppercase text-center my-4">Register</h1>
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
                Have an account? <Link to="/">Login</Link>
              </span>
            </div>
            <h3 className="error"> { errorMsg } </h3>
          </div>
        </div>
    </div>
  )
}