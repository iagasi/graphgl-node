import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient ,ApolloProvider,createHttpLink,HttpLink,InMemoryCache} from '@apollo/client';
import { GlobalContextProvider } from './context/globalContext';
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context';


const httpLink=createHttpLink({
  uri:"http://localhost:5000/graphql",
  credentials:"include"
})
const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('acessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer${token}`:"",
    }
  }
});
const client=new ApolloClient({
link:authLink.concat(httpLink),
  //uri:'http://localhost:5000/graphql',
  cache:new InMemoryCache()
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <ApolloProvider client={client}>

<React.StrictMode>
  <GlobalContextProvider>
        <App />

  </GlobalContextProvider>
  </React.StrictMode>

  </ApolloProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
