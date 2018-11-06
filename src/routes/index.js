import React from 'react';
import { Route, BrowserRouter, withRouter } from "react-router-dom";

const DefaultRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>
	   <Component {...props} />
        </React.Fragment>
      )}
    />
  );
};

export { DefaultRoute }
