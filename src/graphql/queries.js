import gql from "graphql-tag";

const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      status
      email
    }
  }
`;

export { USER };
