import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";

import { ApolloProvider } from "react-apollo";
import client from "./graphql";

import Login from "./components/Login";
import Forgot from "./components/Forgot";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

import { DefaultRoute, DashboardRoute } from "./routes";

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <DefaultRoute
              exact
              path="/"
              component={() => <Redirect to="login" />}
            />
            <DefaultRoute exact path="/login" component={() => <Login />} />
            <DefaultRoute exact path="/forgot" component={() => <Forgot />} />
            <DefaultRoute exact path="/signup" component={() => <Signup />} />

            <DashboardRoute
              exact
              path="/dashboard"
              component={() => <Dashboard />}
            />

            <DefaultRoute component={() => <Login />} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
