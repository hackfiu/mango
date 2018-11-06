import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import Login from "./components/Login";
import Forgot from "./components/Forgot";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

import { DefaultRoute } from "./routes";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  uri: "https://peach.now.sh/graphql",
  link: authLink.concat(httpLink),
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    );
  }
}
