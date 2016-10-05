import config from './graphql-middleware';
import reducer from './graphql-reducer';

const graphql = {
  graphqlMiddleware: config,
  graphqlReducer: reducer,
};

export default graphql;