import React from 'react';
import { Redirect } from 'react-router';
import { SyncLoader } from 'react-spinners';

import Shell from './shared/Shell';
import Card from './shared/Card';

import { Mutation } from 'react-apollo';
import { VERIFY } from '../graphql/mutations';

import tokenService from '../services/token';

import config from '../config';

const EVENT_COLOR = config.EVENT_MAIN_COLOR;

/* This class exists so that the mutation can take place when the component mounts
   as per this issue: https://stackoverflow.com/questions/49456738/how-to-run-a-mutation-on-mount-with-react-apollo-2-1s-mutation-component
*/
class CallVerify extends React.Component {
  componentDidMount = () => {
    const { verify, token } = this.props;
    verify({ variables: { token } });
  };
  render() {
    return null;
  }
}



const Verify = props => (
  <Shell>
    <Card>
      <Mutation mutation={VERIFY}>
        {(verify, { loading, error, data }) => {
          if (loading) {
            return (
              <SyncLoader color={EVENT_COLOR} />
            );
          }
          if (error) {
            console.error(error);
          }
          if (data) {
            tokenService.storeToken(data);
            return <Redirect to="/dashboard" />;
          }
          const token = tokenService.extractToken(props)
          return (
            <CallVerify verify={verify} token={token} />
          );
        }}
      </Mutation>
    </Card>
  </Shell>
)

export default Verify;