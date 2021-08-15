import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = new createHttpLink({
    uri: "http://localhost:4000/"
})

const cache = new InMemoryCache();

const client = new ApolloClient({
    link,
    cache
});

export default client