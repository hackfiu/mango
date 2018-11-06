import React from "react";
import { Input, Button, Form, Label, FormGroup } from "reactstrap";

import Shell from "./shared/Shell";
import ShellCard from "./shared/ShellCard";

import { Mutation } from "react-apollo";
import { SIGN_UP } from "../graphql/mutations";

import config from "../config";

export default class Signup extends React.Component {
  submit = (e, signUp) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    signUp({ variables: { email, password } });
  };

  auth = data => {
    if (data) {
      const { signUp } = data;
      localStorage.setItem("jwt", signUp);
    }
  };

  render() {
    const LOGIN_BUTTON = { background: config.EVENT_MAIN_COLOR };

    return (
      <Shell>
        <ShellCard>
          <Mutation mutation={SIGN_UP}>
            {(signUp, { data }) => {
              this.auth(data);
              return (
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
                      type="password"
                      placeholder="Confirm password"
                      autoComplete="off"
                    />
                  </FormGroup>

                  <Button style={LOGIN_BUTTON}>Sign Up</Button>
                  <div className="login-forgot" />
                  <hr />
                  <div className="login-options">
                    <a href="/">Back</a>
                  </div>
                </Form>
              );
            }}
          </Mutation>
        </ShellCard>
      </Shell>
    );
  }
}
