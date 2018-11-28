import React from "react";
import { Redirect } from "react-router";
import { SyncLoader } from "react-spinners";
import { Input, Button, Form, Label, FormGroup, Fade } from "reactstrap";

import Shell from "./shared/Shell";
import Card from "./shared/Card";

import { Mutation } from "react-apollo";
import { SIGN_UP } from "../graphql/mutations";

import tokenService from '../services/token';

import config from "../config";

const EVENT_COLOR = config.EVENT_MAIN_COLOR;

const LOGIN_BUTTON = { background: config.EVENT_MAIN_COLOR };

const LOGO_NAME = config.EVENT_LOGO;
const LOGO_PATH = require(`../assets/images/${LOGO_NAME}`);

export default class Signup extends React.Component {
  validatePassword = password => {
    if (password.length < 8)
      throw new Error("Password must be at least 8 characters long.");
  };

  confirmPasswords = (password, confirmPassword) => {
    if (password !== confirmPassword)
      throw new Error("Passwords do not match.");
  };

  submit = (e, signUp) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    try {
      this.validatePassword(password);
      this.confirmPasswords(password, confirmPassword);

      signUp({ variables: { email, password } });
    } catch (e) {
      alert(e.message);
    }
  };

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
      <div className="access-forgot" />
      <hr />
      <div className="access-options">
        <a href="/">Back</a>
      </div>
    </Form>
  );

  render() {
    return (
      <Shell>
        <div className="access">
          <Fade>
            <Card image={LOGO_PATH}>
              <Mutation mutation={SIGN_UP}>
                {(signUp, { loading, error, data }) => {
                  if (loading) {
                    return (
                      <SyncLoader color={EVENT_COLOR} />
                    );
                  }
                  if (error) {
                    console.log(error);
                  }
                  if (data) {
                    tokenService.storeToken(data);
                    return <Redirect to="/dashboard" />;
                  }
                  return this.form(signUp);
                }}
              </Mutation>
            </Card>
          </Fade>
        </div>
      </Shell>
    );
  }
}
