import gql from 'graphql-tag';

const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      status
      email
    }
  }
`;

const APPLICATION = gql`
  query User($id: ID!) {
    user(id: $id) {
      application {
        firstName
        lastName
        levelOfStudy
        major
        gender
        shirtSize
      }
    }
  }
`;

export { USER, APPLICATION };
