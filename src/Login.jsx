import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    const userOb = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    axios
      .post("/users/login", userOb)
      .then((res) => {
        console.log(res.data);
        if (!res.data.token) {
          throw Error(res.data.debug_data);
        } else {
          localStorage.setItem("jwt", res.data.token);
          document.querySelector(".logout").style.visibility = "visible";
          navigate("/members");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  return (
    <form onSubmit={loginUser} className='form-container bg-light clearfix'>
      <h1 className='text-center mb-4'>LOGIN</h1>
      <div className='form-group'>
        <input
          required
          type='text'
          className='form-control'
          name='username'
          placeholder='Username'
        />
        <input
          required
          type='password'
          name='password'
          className='form-control'
          placeholder='Password'
        />
      </div>
      <input type='submit' className='btn btn-success m-1' value='Login' />
    </form>
  );
}
