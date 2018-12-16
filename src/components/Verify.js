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
const VerifyToken = props => {
  const { verify, token } = props;
  verify({ variables: { token } });
  return null;
};

const Verify = props => {
  const token = tokenService.extractToken(props);
  return (
    <Shell>
      <Card>
        <Mutation mutation={VERIFY}>
          {(verify, { loading, error, data }) => {
            if (loading) {
              return <SyncLoader color={EVENT_COLOR} />;
            }
            if (error) {
              console.error(error);
            }
            if (data) {
              const { token } = data.verify;
              tokenService.storeToken(token);
              return <Redirect to="/dashboard" />;
            }
            return <VerifyToken verify={verify} token={token} />;
          }}
        </Mutation>
      </Card>
    </Shell>
  );
};

export default Verify;
