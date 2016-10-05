'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphqlMiddleware = require('./graphql-middleware');

var defaultState = {
  isFetching: false,
  data: null,
  error: null
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];
  var graphReady = _graphqlMiddleware.actions.graphReady;
  var graphDone = _graphqlMiddleware.actions.graphDone;
  var graphError = _graphqlMiddleware.actions.graphError;

  switch (action.type) {
    case graphReady:
      return _extends({}, state, {
        isFetching: !action.data,
        data: null,
        error: null
      });
    case graphDone:
      return _extends({}, state, {
        data: action.data,
        error: null
      });
    case graphError:
      return _extends({}, state, {
        error: action.error,
        data: null
      });
    default:
      return state;
  }
};

exports.default = reducer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLXJlZHVjZXIuanMiXSwibmFtZXMiOlsiZGVmYXVsdFN0YXRlIiwiaXNGZXRjaGluZyIsImRhdGEiLCJlcnJvciIsInJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsImdyYXBoUmVhZHkiLCJncmFwaERvbmUiLCJncmFwaEVycm9yIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFNQSxlQUFlO0FBQ25CQyxjQUFZLEtBRE87QUFFbkJDLFFBQU0sSUFGYTtBQUduQkMsU0FBTztBQUhZLENBQXJCOztBQU1BLElBQU1DLFVBQVUsU0FBVkEsT0FBVSxHQUFrQztBQUFBLE1BQWpDQyxLQUFpQyx1RUFBekJMLFlBQXlCO0FBQUEsTUFBWE0sTUFBVztBQUFBLE1BRTlDQyxVQUY4Qyw4QkFFOUNBLFVBRjhDO0FBQUEsTUFHOUNDLFNBSDhDLDhCQUc5Q0EsU0FIOEM7QUFBQSxNQUk5Q0MsVUFKOEMsOEJBSTlDQSxVQUo4Qzs7QUFNaEQsVUFBUUgsT0FBT0ksSUFBZjtBQUNFLFNBQUtILFVBQUw7QUFDRSwwQkFDS0YsS0FETDtBQUVFSixvQkFBWSxDQUFDSyxPQUFPSixJQUZ0QjtBQUdFQSxjQUFNLElBSFI7QUFJRUMsZUFBTztBQUpUO0FBTUYsU0FBS0ssU0FBTDtBQUNFLDBCQUNLSCxLQURMO0FBRUVILGNBQU1JLE9BQU9KLElBRmY7QUFHRUMsZUFBTztBQUhUO0FBS0YsU0FBS00sVUFBTDtBQUNFLDBCQUNLSixLQURMO0FBRUVGLGVBQU9HLE9BQU9ILEtBRmhCO0FBR0VELGNBQU07QUFIUjtBQUtGO0FBQ0UsYUFBT0csS0FBUDtBQXJCSjtBQXVCRCxDQTdCRDs7a0JBK0JlRCxPIiwiZmlsZSI6ImdyYXBocWwtcmVkdWNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFjdGlvbnMgfSBmcm9tICcuL2dyYXBocWwtbWlkZGxld2FyZSc7XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgaXNGZXRjaGluZzogZmFsc2UsXG4gIGRhdGE6IG51bGwsXG4gIGVycm9yOiBudWxsLFxufTtcblxuY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IGRlZmF1bHRTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBncmFwaFJlYWR5LFxuICAgIGdyYXBoRG9uZSxcbiAgICBncmFwaEVycm9yLFxuICB9ID0gYWN0aW9ucztcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgZ3JhcGhSZWFkeTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc0ZldGNoaW5nOiAhYWN0aW9uLmRhdGEsXG4gICAgICAgIGRhdGE6IG51bGwsXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgfVxuICAgIGNhc2UgZ3JhcGhEb25lOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRhdGE6IGFjdGlvbi5kYXRhLFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgIH1cbiAgICBjYXNlIGdyYXBoRXJyb3I6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZXJyb3I6IGFjdGlvbi5lcnJvcixcbiAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVkdWNlcjsiXX0=