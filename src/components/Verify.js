import React from 'react';
import { Redirect } from 'react-router';
import Shell from './shared/Shell';
import Card from './shared/Card';
import { SyncLoader } from 'react-spinners';
import { Mutation } from 'react-apollo';
import { VERIFY } from '../graphql/mutations';
import config from '../config';
import qs from 'query-string';

const EVENT_COLOR = config.EVENT_MAIN_COLOR;

class CallVerify extends React.Component {
  componentDidMount = () => {
    const { verify, token } = this.props;
    verify({ variables: { token } });
  };

  render() {
    return <Card />;
  }
}

export default class Verify extends React.Component {
  getVerificationToken = verify => {
    const { search } = this.props.location;
    const { token } = qs.parse(search);
    return token;
  };

  storeToken = ({ verify: { token } }) => localStorage.setItem('JWT', token);

  render() {
    return (
      <Shell>
        <Mutation mutation={VERIFY}>
          {(verify, { loading, error, data }) => {
            if (loading) {
              return (
                <Card>
                  <SyncLoader color={EVENT_COLOR} />
                </Card>
              );
            }
            if (error) {
              console.error(error);
              return false;
            }
            if (data) {
              this.storeToken(data);
              return <Redirect to="/dashboard" />;
            }

            return (
              <CallVerify verify={verify} token={this.getVerificationToken()} />
            );
          }}
        </Mutation>
      </Shell>
    );
  }
}
