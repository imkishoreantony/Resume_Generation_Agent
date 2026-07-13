import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import refreshToken from "../services/refreshToken";

function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    const verifyUser = async () => {

      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");

      if (access) {
        setAuthenticated(true);
        setLoading(false);
        return;
      }

      if (refresh) {

        const newAccess = await refreshToken();

        if (newAccess) {
          setAuthenticated(true);
        }

      }

      setLoading(false);

    };

    verifyUser();

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;

}

export default ProtectedRoute;