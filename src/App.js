import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";

import { ApolloProvider } from "react-apollo";
import client from "./graphql";

import Login from "./components/Login";
import Forgot from "./components/Forgot";
import Signup from "./components/Signup";
import Dashboard from "./components/dashboard/Home";
import Application from "./components/dashboard/Application";
import Settings from "./components/dashboard/Settings";

import { DefaultRoute, DashboardRoute, AddPropsToRoute } from "./routes";

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
              component={AddPropsToRoute(Dashboard)}
            />

            <DashboardRoute
              exact
              path="/application"
              component={AddPropsToRoute(Application)}
            />

            <DashboardRoute
              exact
              path="/settings"
              component={AddPropsToRoute(Settings)}
            />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
