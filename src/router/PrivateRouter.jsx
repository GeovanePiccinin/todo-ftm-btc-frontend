import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  let { user } = useAuthContext();
  console.log("PrivateRoute user", user);

  if (user || JSON.parse(localStorage.getItem("user"))) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
