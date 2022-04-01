import axios from "axios";
import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

export default function Members(props) {
  const [result, setResult] = useState([]);
  const [jwt_token] = useLocalStorage("jwt");

  useEffect(() => {
    axios
      .get(`/users/getuser`, {
        headers: {
          token: jwt_token,
        },
      })
      .then((res) => {
        if (res.data.err === null) {
          setResult(res.data.results[0]);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error while loading details");
      });
  }, []);

  return (
    <div>
      <h1 className='text-light text-center mb-3'>Member Details</h1>
      <table className='table bg-light container'>
        <thead className='thead-light'>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Username</th>
            <th scope='col'>Password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>{result.id}</th>
            <td>{result.username}</td>
            <td>{result.password}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
