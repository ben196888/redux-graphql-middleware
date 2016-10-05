import { actions } from './graphql-middleware';

const defaultState = {
  isFetching: false,
  data: null,
  error: null,
};

const reducer = (state = defaultState, action) => {
  const {
    graphReady,
    graphDone,
    graphError,
  } = actions;
  switch (action.type) {
    case graphReady:
      return {
        ...state,
        isFetching: !action.data,
        data: null,
        error: null,
      }
    case graphDone:
      return {
        ...state,
        data: action.data,
        error: null,
      }
    case graphError:
      return {
        ...state,
        error: action.error,
        data: null,
      };
    default:
      return state;
  }
};

export default reducer;