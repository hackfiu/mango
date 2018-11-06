import React from "react";
import { Input, Button, Form, Label, FormGroup } from "reactstrap";

import Shell from "./shared/Shell";
import ShellCard from "./shared/ShellCard";

import config from "../config";

export default class Signup extends React.Component {
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
        </ShellCard>
      </Shell>
    );
  }
}
