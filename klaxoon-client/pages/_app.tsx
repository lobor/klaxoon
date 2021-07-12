import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { HttpLink } from "@apollo/client/link/http";

const httpGatewayLink = new HttpLink({
  fetch,
  uri: 'http://localhost:3004/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpGatewayLink,
});

function MyApp({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}><Component {...pageProps} /></ApolloProvider>
}
export default MyApp
