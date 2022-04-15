import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client'

// setting up apollo
export const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache()
})
