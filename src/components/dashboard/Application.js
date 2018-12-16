import React from 'react';
import jwt_decode from 'jwt-decode';
import { SyncLoader } from 'react-spinners';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { Mutation, Query } from 'react-apollo';
import { APPLICATION } from '../../graphql/queries';
import { UPDATE_APPLICATION } from '../../graphql/mutations';

import DashShell from '../shared/DashShell';
import Card from '../shared/Card';

import schools from '../../assets/data/schools.json';
import config from '../../config';

const EVENT_COLOR = config.EVENT_MAIN_COLOR;
const FORM_BUTTON = { background: config.EVENT_MAIN_COLOR };

const ApplicationForm = props => {
  const { fields, data = { user: { application: {} } } } = props;
  const { application } = data.user;
  return (
    <Form
      className="application"
      onSubmit={props.submit}
      encType="multipart/form-data"
    >
      {fields.map(field => (
        <FormGroup key={field.name}>
          <Label for={field.name}>{field.label}</Label>

          {field.type === 'text' && (
            <Input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              defaultValue={application[field.name]}
              autoComplete="off"
            />
          )}

          {field.type === 'select' && (
            <Input type={field.type} name={field.name} defaultValue={application[field.name]}>
              {field.options.map(option => (
                <option key={option}> {option} </option>
              ))}
            </Input>
          )}

          {field.type === 'datalist' && ([
            <Input key='input' type="text" list={`${field.name}-list`} name={field.name} defaultValue={application[field.name]}/>,
            <datalist key='list' id={`${field.name}-list`}>
              {field.options.map(option => (
                <option key={option} value={option} />
              ))}
            </datalist>
           ])}

          {field.type === 'file' && (
            <input type="file" name={field.name} defaultValue={application[field.name]}/>
          )}
        </FormGroup>
      ))}
      <Button style={FORM_BUTTON}>Submit</Button>
    </Form>
  );
};

export default class Application extends React.Component {
  submit = (e, updateApplication) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const fields = {}
    form.forEach((value, key) => { 
      fields[key] = value 
    });
    console.log(fields)
    try {
      updateApplication({ variables: fields });
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    const JWT = localStorage.getItem('JWT');
    const { id } = jwt_decode(JWT);

    const formFields = [
      {
        type: 'text',
        name: 'firstName',
        placeholder: 'Mike',
        label: 'First Name',
      },

      {
        type: 'text',
        name: 'lastName',
        placeholder: 'Swift',
        label: 'Last Name',
      },
      {
        type: 'datalist',
        name: 'school',
        label: 'School',
        options: schools,
      },
      {
        type: 'datalist',
        name: 'major',
        label: 'Major',
        options: ['Computer Science', 'Information Technology'],
      },
      {
        type: 'select',
        name: 'levelOfStudy',
        label: 'Level of Study',
        options: ['FRESHMAN', 'SOPHMORE', 'JUNIOR', 'SENIOR', 'SENIORPLUS', 'GRADUATE', 'OTHER'],
      },
      {
        type: 'select',
        name: 'gender',
        label: 'Gender',
        options: ['MALE', 'FEMALE', 'OTHER', 'NORESPONSE'],
      },
      {
        type: 'file',
        name: 'resume',
      },
      ...config.APPLICATION_EXTRA_FIELDS
    ];
    return (
      <DashShell>
        <Query query={APPLICATION} variables={{ userId: id }}>
          {({ loading, error, data }) => (
            <Mutation mutation={UPDATE_APPLICATION}>
              {(updateApplication) => {
                if (loading) {
                  return (
                    <Card>
                      <SyncLoader color={EVENT_COLOR} />
                    </Card>
                  );
                }
                if (error) {
                  console.log(error);
                }
                if (data) {
                  const { user } = data;
                  console.log({ user });
                }
                return (
                  <Card title="Application">
                    <ApplicationForm
                      fields={formFields}
                      data={data}
                      submit={e => this.submit(e, updateApplication)}
                    />
                  </Card>
                );
              }}
            </Mutation>
          )}
        </Query>
      </DashShell>
    );
  }
}
