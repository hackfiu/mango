import React from "react";
import { Redirect } from "react-router";
import { Input, Button, Form, Label, FormGroup } from "reactstrap";

import Shell from "./shared/Shell";
import ShellCard from "./shared/ShellCard";

import { Mutation } from "react-apollo";
import { SIGN_UP } from "../graphql/mutations";

import config from "../config";

const LOGIN_BUTTON = { background: config.EVENT_MAIN_COLOR };

export default class Signup extends React.Component {
  submit = (e, signUp) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");

    signUp({ variables: { email, password } });
  };

  storeToken = ({ signUp: { token } }) => localStorage.setItem("JWT", token);

  form = signUp => (
    <Form onSubmit={e => this.submit(e, signUp)}>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          name="email"
          type="email"
          placeholder="foo@bar.edu"
          autoComplete="off"
        />
      </FormGroup>

      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="off"
        />
      </FormGroup>

      <FormGroup>
        <Label for="password">Confirm Password</Label>
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          autoComplete="off"
        />
      </FormGroup>

      <Button style={LOGIN_BUTTON} type="submit">
        Sign Up
      </Button>
      <div className="login-forgot" />
      <hr />
      <div className="login-options">
        <a href="/">Back</a>
      </div>
    </Form>
  );

  render() {
    return (
      <Shell>
        <ShellCard>
          <Mutation mutation={SIGN_UP}>
            {(signUp, { loading, error, data }) => {
              if (loading) console.log("loading..");
              if (error) console.log(error);
              if (data) {
                this.storeToken(data);
                return <Redirect to="/dashboard" />;
              }

              return this.form(signUp);
            }}
          </Mutation>
        </ShellCard>
      </Shell>
    );
  }
}
