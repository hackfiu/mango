import React from 'react';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router';
import { SyncLoader } from 'react-spinners';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import DashShell from '../shared/DashShell';
import Card from '../shared/Card';

import { Mutation, Query } from 'react-apollo';
import { APPLICATION } from '../../graphql/queries';
import { UPDATE_APPLICATION } from '../../graphql/mutations';

import config from '../../config';

const EVENT_COLOR = config.EVENT_MAIN_COLOR;
const FORM_BUTTON = { background: config.EVENT_MAIN_COLOR };

const ApplicationForm = props => {
  const { fields } = props;
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
              autoComplete="off"
            />
          )}

          {field.type === 'select' && (
            <Input type={field.type} name={field.name}>
              {/* <option value="" selected disabled>
                Major League University
              </option> */}
              {field.options.map(option => (
                <option key={option}> {option} </option>
              ))}
            </Input>
          )}

          {field.type === 'file' && (
            // <div className="upload-btn-wrapper">
            // {/* <button className="btn">Resume</button> */}
            <input type="file" name={field.name} />
            // {/* </div> */}
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

    let values = [...form.values()];
    let fields = {};
    [...form.keys()].forEach((key, i) => {
      fields[key] = values[i];
    });

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
        type: 'select',
        name: 'school',
        label: 'School',
        options: ['Florida International University', 'University of Miami'],
      },
      {
        type: 'select',
        name: 'major',
        label: 'Major',
        options: ['Computer Science', 'Information Technology'],
      },
      {
        type: 'select',
        name: 'levelOfStudy',
        label: 'Level of Study',
        options: ['FRESHMAN', 'SOPHMORE', 'JUNIOR', 'SENIOR'],
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
    ];

    return (
      <DashShell>
        {/* <Query query={APPLICATION} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) {
              <Card>
                <SyncLoader color={EVENT_COLOR} />;
              </Card>;
            }
            if (error) {
              console.log(error);
            }
            if (data) {
              const { user } = data;
              console.log(user); */}
        <Mutation mutation={UPDATE_APPLICATION}>
          {(updateApplication, { loading, error, data }) => {
            if (loading) {
              return (
                <Card>
                  <SyncLoader color={EVENT_COLOR} />;
                </Card>
              );
            }
            if (error) {
              console.log(error.message);
            }

            if (data) {
              console.log(data);
            }

            return (
              <Card title="Application">
                <ApplicationForm
                  fields={formFields}
                  submit={e => this.submit(e, updateApplication)}
                />
              </Card>
            );
          }}
        </Mutation>
        {/* //     return ( */}
        {/* //       <Card title="Application"> */}
        {/* //         <ApplicationForm */}
        {/* //           fields={formFields} */}
        {/* //           submit={e => this.submit(e, updateApplication)} */}
        {/* //         /> */}
        {/* //       </Card> */}
        {/* //     ); */}
        {/* //   }} */}
        {/* // </Query> */}
      </DashShell>
    );
  }
}
