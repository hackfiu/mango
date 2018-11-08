import ApolloClient from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({ uri: "/graphql" });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("JWT");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  uri: "https://peach.now.sh/graphql",
  link: authLink.concat(httpLink)
});

export default client;
