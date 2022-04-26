import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";

const PrivateRoute = ({ component, ...args }) => {
  return (
    <Route
      {...args}
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <Loading />,
        returnTo: window.location.origin,
      })}
    />
  );
};

export default PrivateRoute;
