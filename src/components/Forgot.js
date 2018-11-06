import React from "react";
import { Form, FormGroup, Label, Button, Input } from "reactstrap";

import Shell from "./shared/Shell";
import ShellCard from "./shared/ShellCard";

import config from "../config";

export default class Forgot extends React.Component {
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

            <Button style={LOGIN_BUTTON}>Reset</Button>
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
