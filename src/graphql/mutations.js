import gql from "graphql-tag";

const SIGN_UP = gql`
    mutation SignUp(email: $email, password: $password) {
        signUp(email: $email, password: $password)
    }
`;

const LOG_IN = gql`
    mutation LogIn(email: $email, password: $password) {
        logIn(email: $email, password: $password)
    }
`;

export default { SIGN_UP, LOG_IN }