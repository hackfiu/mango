import React from "react";
import { Input, Button, Form, Label, FormGroup } from "reactstrap";

import Shell from "./shared/Shell";
import ShellCard from "./shared/ShellCard";

import config from "../config";

export default class Login extends React.Component {
  render() {
    const LOGIN_BUTTON = { background: config.EVENT_MAIN_COLOR };

    return (
      <Shell>
        <ShellCard>
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                placeholder="foo@bar.edu"
                autoComplete="off"
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                autoComplete="off"
              />
            </FormGroup>

            <Button style={LOGIN_BUTTON}>Log In</Button>
            <div className="login-forgot" />
            <hr />
            <div className="login-options">
              <a href="/forgot">Forgot Password?</a>
              <a href="/signup">
                Sign Up <i className="fa fa-caret-right" aria-hidden="true" />
              </a>
            </div>
          </Form>
        </ShellCard>
      </Shell>
    );
  }
}
