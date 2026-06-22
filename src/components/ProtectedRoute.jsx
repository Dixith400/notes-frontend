import { Navigate } from "react-router-dom";
import { tokenStorage } from "../utils/tokenStorage";

const ProtectedRoute = ({ children }) => {
  const token = tokenStorage.get();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
