import { Navigate, Outlet } from "react-router-dom";

export default function Protection() {
  let jwt_token = localStorage.getItem("jwt");
  if (jwt_token.length > 0) return <Outlet />;
  else return <Navigate to='/' />;
}
