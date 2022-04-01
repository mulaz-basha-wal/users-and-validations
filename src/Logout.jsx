import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  let navigate = useNavigate();

  return (
    <>
      <button
        className='btn btn-danger logout'
        onClick={(e) => {
          localStorage.setItem("jwt", "");
          navigate("/");
          e.target.style.visibility = "hidden";
        }}>
        Logout
      </button>
    </>
  );
}
