import { useSelector } from "react-redux";
import { Navigate } from "@tanstack/react-router";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>; // spinner dikhana chaho to
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
