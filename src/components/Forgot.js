import React from "react";
import { SyncLoader } from "react-spinners";
import { Form, FormGroup, Label, Button, Input, Fade } from "reactstrap";

import Shell from "./shared/Shell";
import Card from "./shared/Card";

import { Mutation } from "react-apollo";
import { FORGOT_PASSWORD } from "../graphql/mutations";

import config from "../config";

const EVENT_COLOR = config.EVENT_MAIN_COLOR;

const LOGIN_BUTTON = { background: config.EVENT_MAIN_COLOR };

const LOGO_NAME = config.EVENT_LOGO;
const LOGO_PATH = require(`../assets/images/${LOGO_NAME}`);

export default class Forgot extends React.Component {
  submit = (e, forgotPassword) => {
    e.preventDefault();
    // TODO: Implement this function.
    // const data = new FormData(e.target);
    // const email = data.get("email");
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
          <Fade>
            <Card image={LOGO_PATH}>
              <Mutation mutation={FORGOT_PASSWORD}>
                {(forgotPassword, { loading, error, data }) => {
                  if (loading) {
                    return (
                      <Card>
                        <SyncLoader color={EVENT_COLOR} />
                      </Card>
                    );
                  }
                  if (error) {
                    return alert(error.message);
                  }

                  if (data) {
                    return alert("Email sent");
                  }

                  return this.form(forgotPassword);
                }}
              </Mutation>
            </Card>
          </Fade>
        </div>
      </Shell>
    );
  }
}
