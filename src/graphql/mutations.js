import gql from 'graphql-tag';

const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
    }
  }
`;

const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      token
    }
  }
`;

const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

const VERIFY = gql`
  mutation Verify($token: String!) {
    verify(token: $token) {
      token
    }
  }
`;

const UPDATE_APPLICATION = gql`
  mutation UpdateApplication(
    $firstName: String
    $lastName: String
    $major: String
    $levelOfStudy: LevelOfStudy
    $gender: Gender
    $shirtSize: ShirtSize,
    $resume: Upload
  ) {
    updateApplication(
      firstName: $firstName
      lastName: $lastName
      major: $major
      levelOfStudy: $levelOfStudy
      gender: $gender
      shirtSize: $shirtSize,
      resume: $resume
    ){
      firstName
    }
  }
`;

export { SIGN_UP, LOG_IN, FORGOT_PASSWORD, VERIFY, UPDATE_APPLICATION };
