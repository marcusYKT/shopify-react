import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import App from './App'

// http link that connects our app to graphql
const httpLink = createHttpLink({
  uri: 'https://myt-react-js.myshopify.com/api/graphql'
})

// middleware to authenticate our request
const middlewareLink = setContext(()=> ({
  headers: {
    'X-Shopify-Storefront-Access-Token': '957fbd69b3aa65f31b34680b0d655282'
  }
}))

// create apollo client
const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache()
})

// render an app on the page using apollo provider

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
)