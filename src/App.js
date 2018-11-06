import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Login from "./components/Login";
import Forgot from "./components/Forgot";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

import { DefaultRoute } from "./routes";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <DefaultRoute exact path="/" component={() => <Login />} />
            <DefaultRoute exact path="/forgot" component={() => <Forgot />} />
            <DefaultRoute exact path="/signup" component={() => <Signup />} />
            <DefaultRoute
              exact
              path="/dashboard"
              component={() => <Dashboard />}
            />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
