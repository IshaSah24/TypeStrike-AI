import React, { useEffect } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useSelector } from "react-redux";
// Note:
// This component ensures that only authenticated users can access certain pages.
// If someone tries to open a protected page directly, the Back button won’t take them out of the app.
// Basically, "/" (home) is added to the browser history first, then the protected route (e.g., /login) is pushed.
// So when the user presses Back, they always go to "/" instead of leaving the site.

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      const visited = (() => {
        try {
          return sessionStorage.getItem("appVisited");
        } catch (e) {
          return null;
        }
      })();

      if (!visited) {
        navigate({ to: "/", search: undefined, replace: true });
        navigate({
          to: "/login",
          search: undefined,
          replace: false,
          state: { from: location },
        });
      } else {
        navigate({
          to: "/login",
          search: undefined,
          replace: true,
          state: { from: location },
        });
      }
    }
  }, [loading, isAuthenticated, navigate, location]);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return null; 

  return <>{children}</>;
}
