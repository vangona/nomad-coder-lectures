import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = new createHttpLink({
    uri: "http://localhost:4000/"
})

const cache = new InMemoryCache();

const client = new ApolloClient({
    link,
    resolvers: {
        Movie: {
            isLiked: () => false
        },
        Mutation: {
            toggleLikeMovie: (_, { id }, {cache}) => {
                cache.modify({
                    id: `Movie:${id}`,
                    fields: {
                        isLiked: (isLiked) => !isLiked
                    }
                })            
            },
    }},
    cache
});

export default client