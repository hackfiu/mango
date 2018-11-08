import React from "react";
import { Route, Redirect } from "react-router-dom";

const DefaultRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("JWT");

  const requestedRoute = (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>
          <Component {...props} />
        </React.Fragment>
      )}
    />
  );

  return token ? <Redirect to="dashboard" /> : requestedRoute;
};

const DashboardRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("JWT");

  const dashboard = (
    <Route {...rest} render={props => <Component {...props} />} />
  );

  return token ? dashboard : <Redirect to="login" />;
};

export { DefaultRoute, DashboardRoute };
