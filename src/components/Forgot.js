import React from "react";
import { Form, FormGroup, Label, Button, Input } from "reactstrap";

import Shell from "./shared/Shell";
import Card from "./shared/Card";

import { Mutation } from "react-apollo";
import { FORGOT_PASSWORD } from "../graphql/mutations";

import config from "../config";

const LOGIN_BUTTON = { background: config.EVENT_MAIN_COLOR };

const LOGO_NAME = config.EVENT_LOGO;
const LOGO_PATH = require(`../assets/images/${LOGO_NAME}`);

export default class Forgot extends React.Component {
  submit = (e, forgotPassword) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const email = data.get("email");

    // forgotPassword({ variables: { email } });
  };

  form = forgotPassword => (
    <Form onSubmit={e => this.submit(e, forgotPassword)}>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          name="email"
          type="email"
          placeholder="foo@bar.edu"
          autoComplete="off"
        />
      </FormGroup>
      <Button style={LOGIN_BUTTON}>Reset</Button>
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
          <Card image={LOGO_PATH}>
            <Mutation mutation={FORGOT_PASSWORD}>
              {(forgotPassword, { loading, error, data }) => {
                if (loading) console.log("loading..");
                if (error) alert(error.message);
                if (data) {
                  alert("Email sent");
                }

                return this.form(forgotPassword);
              }}
            </Mutation>
          </Card>
        </div>
      </Shell>
    );
  }
}
