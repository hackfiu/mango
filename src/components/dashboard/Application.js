import React from 'react';
import jwt_decode from 'jwt-decode';
import { SyncLoader } from 'react-spinners';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { Mutation, Query } from 'react-apollo';
import { APPLICATION } from '../../graphql/queries';
import { UPDATE_APPLICATION, SUBMIT_APPLICATION } from '../../graphql/mutations';

import DashShell from '../shared/DashShell';
import Card from '../shared/Card';

import schools from '../../assets/data/schools.json';
import config from '../../config';

const EVENT_COLOR = config.EVENT_MAIN_COLOR;
const FORM_BUTTON = { background: config.EVENT_MAIN_COLOR };

class ApplicationForm extends React.Component {
  submit = (e, applicationMutation) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const fields = {}
    form.forEach((value, key) => {
      fields[key] = value
    });
    try {
      applicationMutation({ variables: fields });
    } catch (err) {
      alert(err.message);
    }
  };

  render() {
    const { fields, data: application } = this.props;
    return (
      <Form
        className="application"
        onSubmit={e => this.state.button === "save" ? this.submit(e, this.props.update) : this.submit(e, this.props.submit)}
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
              <Input key='input' type="text" list={`${field.name}-list`} name={field.name} defaultValue={application[field.name]} />,
              <datalist key='list' id={`${field.name}-list`}>
                {field.options.map(option => (
                  <option key={option} value={option} />
                ))}
              </datalist>
            ])}
  
            {field.type === 'file' && (
              <input key="input" type="file" name={field.name} id={field.name} />
            )}
          </FormGroup>
        ))}
        <Button style={FORM_BUTTON} type="submit" onClick={() => this.setState({ button: "save" })}>Save</Button>
        <Button style={FORM_BUTTON} type="submit" onClick={() => this.setState({ button: "submit" })}>Save and Submit</Button>
      </Form>
    );
  }
}

export default class Application extends React.Component {
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
        type: 'select',
        name: 'shirtSize',
        label: 'Shirt Size',
        options: ['XSMALL', 'SMALL', 'MEDIUM', 'LARGE', 'XLARGE']
      },
      {
        type: 'file',
        name: 'resume',
        label: 'Resume',
      },
      ...config.APPLICATION_EXTRA_FIELDS
    ];
    return (
      <DashShell>
        <Query query={APPLICATION} variables={{ userId: id }}>
          {({ loading: loadingQuery, error: errQuery, data: queryData }) => (
            <Mutation mutation={UPDATE_APPLICATION}>
              {(updateApplication, { loading: loadingUpdate, error: errUpdate, data: updateData }) => (
                <Mutation mutation={SUBMIT_APPLICATION}>
                  {(submitApplication, { loading: loadingSubmit, error: errSubmit, data: submitData }) => {
                    if (loadingQuery || loadingUpdate || loadingSubmit) {
                      return (
                        <Card>
                          <SyncLoader color={EVENT_COLOR} />
                        </Card>
                      );
                    }
                    if (errQuery || errUpdate || errSubmit) {
                      [errQuery, errUpdate, errSubmit].forEach(err => console.log(err.message));
                    }
                    const data = updateData ? updateData.updateApplication : submitData ? submitData.submitApplication : queryData.user.application;
                    return (
                      <Card title="Application">
                        <ApplicationForm
                          fields={formFields}
                          data={data}
                          userId={id}
                          update={updateApplication}
                          submit={submitApplication}
                        />
                      </Card>
                    );
                  }}
                </Mutation>
              )}
            </Mutation>
          )}
        </Query>
      </DashShell>
    );
  }
}
