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
  query Application($userId: ID!) {
    user(id: $userId) {
      application {
        firstName
        lastName
        levelOfStudy
        school
        major
        gender
        shirtSize
        resume {
          name
        }
      }
    }
  }
`;

export { USER, APPLICATION };
