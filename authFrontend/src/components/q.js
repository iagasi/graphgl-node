
const httpLink = new HttpLink({
    uri: `${config.apiUrl}/graphql`
  });
  
  let token;
  
  const withToken = setContext(async (_, { headers }) => {
    ({ token } = (await Storage.getUserAsync()) || {});
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    };
  });
  
  const resetToken = onError(({ response, networkError }) => {
    if (networkError && networkError.statusCode === 401) {
      // remove cached token on 401 from the server
      store.dispatch(actions.signOut());
      networkError = undefined;
    }
  });
  
  const authFlowLink = withToken.concat(resetToken);
  
  const link = authFlowLink.concat(httpLink);
  
  const cache = new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: fragmentTypes
    })
  });
  
  export default new ApolloClient({
    link,
    cache
  });