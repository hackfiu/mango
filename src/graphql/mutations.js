import gql from "graphql-tag";

const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
    }
  }
`;

const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password)
  }
`;

export { SIGN_UP, LOG_IN };
