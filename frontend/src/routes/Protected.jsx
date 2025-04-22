import React, { createContext } from "react";
import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import { authenticate } from "../helpers/authHelper";
import { ProtectedRouteContext } from "../contex";

const Layout = () => {
  const { authenticated, user } = useLoaderData();

  return !authenticated ? (
    <Navigate to="/signin" replace />
  ) : (
    <ProtectedRouteContext.Provider value={{ user }}>
      <Outlet />;
    </ProtectedRouteContext.Provider>
  );
};

const loader = async () => {
  const authenticated = await authenticate();

  if (authenticated) {
    return { authenticated: true, user: authenticated.user };
  } else {
    return { authenticated: false };
  }
};

export default { Layout, loader };
