import React from 'react';
import jwt_decode from 'jwt-decode';
import { SyncLoader } from 'react-spinners';
import { Fade } from 'reactstrap';

import { Query } from 'react-apollo';
import { USER } from '../../graphql/queries';

import DashShell from '../shared/DashShell';
import Card from '../shared/Card';

import config from '../../config';

const EVENT_COLOR = config.EVENT_MAIN_COLOR;

export default class Home extends React.Component {
  render() {
    const { history } = this.props;

    const JWT = localStorage.getItem('JWT');
    const { id } = jwt_decode(JWT);

    return (
      <DashShell>
        <Query query={USER} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <Fade>
                  <Card>
                    <SyncLoader color={EVENT_COLOR} />
                  </Card>
                </Fade>
              );
            }
            if (error) {
              console.log(error);
              return false;
            }
            if (data) {
              const { user } = data;
              return (
                <Card title="Hey there, hacker">
                  <h3> Status: </h3>

                  <button
                    type="submit"
                    className="status"
                    onClick={() => history.push('/application')}
                  >
                    {user ? user.status : 'In Progress'}
                  </button>
                </Card>
              );
            }
          }}
        </Query>
      </DashShell>
    );
  }
}
