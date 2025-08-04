import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const { user } = useContext(AppContext);
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    console.log("ProtectRoute → user:", user);

    if (user && user.role === "client") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [user]);

  if (isAuthorized === null) return null;

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectRoute;
