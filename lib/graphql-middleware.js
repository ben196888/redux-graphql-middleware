'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphqlFetch = require('./graphql-fetch');

var _graphqlFetch2 = _interopRequireDefault(_graphqlFetch);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function getServer(server, state) {
  if (_lodash2.default.isFunction(server)) {
    return server(_extends({}, state));
  }
  return server;
}

var actions = exports.actions = {
  graphAction: null,
  graphReady: null,
  graphDone: null,
  graphError: null
};

function config() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var server = _ref.server;
  var fetch = _ref.fetch;
  var _ref$action = _ref.action;
  var graphAction = _ref$action === undefined ? 'GRAPH' : _ref$action;
  var _ref$ready = _ref.ready;
  var graphReady = _ref$ready === undefined ? 'GRAPH_READY' : _ref$ready;
  var _ref$done = _ref.done;
  var graphDone = _ref$done === undefined ? 'GRAPH_DONE' : _ref$done;
  var _ref$error = _ref.error;
  var graphError = _ref$error === undefined ? 'GRAPH_ERROR' : _ref$error;
  var _ref$getHeaders = _ref.getHeaders;
  var getHeaders = _ref$getHeaders === undefined ? _lodash2.default.noop : _ref$getHeaders;
  var _ref$getOptions = _ref.getOptions;
  var getOptions = _ref$getOptions === undefined ? _lodash2.default.noop : _ref$getOptions;
  var _ref$getVariables = _ref.getVariables;
  var getVariables = _ref$getVariables === undefined ? _lodash2.default.noop : _ref$getVariables;
  var _ref$onComplete = _ref.onComplete;
  var onCompleteConfig = _ref$onComplete === undefined ? _lodash2.default.noop : _ref$onComplete;
  var _ref$transform = _ref.transform;
  var transformConfig = _ref$transform === undefined ? _lodash2.default.identity : _ref$transform;
  var _ref$errorTransform = _ref.errorTransform;
  var errorTransformConfig = _ref$errorTransform === undefined ? _lodash2.default.identity : _ref$errorTransform;

  if (fetch === undefined) {
    throw '[GraphQL middleware] \'fetch\' is required';
  }

  exports.actions = actions = _extends({}, actions, {
    graphAction: graphAction,
    graphReady: graphReady,
    graphDone: graphDone,
    graphError: graphError
  });

  return function (store) {
    return function (next) {
      return function (action) {
        if (action.type === graphAction || action.graphql) {
          (function () {
            var _ref2 = action.data || {};

            var queryArgRaw = _ref2.query;
            var _ref2$vars = _ref2.vars;
            var varsArg = _ref2$vars === undefined ? {} : _ref2$vars;
            var _ref2$options = _ref2.options;
            var optionsArg = _ref2$options === undefined ? {} : _ref2$options;
            var _ref2$headers = _ref2.headers;
            var headers = _ref2$headers === undefined ? {} : _ref2$headers;

            var rest = _objectWithoutProperties(_ref2, ['query', 'vars', 'options', 'headers']);

            var _ref3 = action.graphql || {};

            var actionServer = _ref3.server;
            var _ref3$transform = _ref3.transform;
            var transform = _ref3$transform === undefined ? transformConfig : _ref3$transform;
            var _ref3$errorTransform = _ref3.errorTransform;
            var errorTransform = _ref3$errorTransform === undefined ? errorTransformConfig : _ref3$errorTransform;
            var _ref3$onComplete = _ref3.onComplete;
            var onComplete = _ref3$onComplete === undefined ? onCompleteConfig : _ref3$onComplete;
            var _ref3$ready = _ref3.ready;
            var actionReady = _ref3$ready === undefined ? graphReady : _ref3$ready;
            var _ref3$done = _ref3.done;
            var actionDone = _ref3$done === undefined ? graphDone : _ref3$done;
            var _ref3$error = _ref3.error;
            var actionError = _ref3$error === undefined ? graphError : _ref3$error;

            var queryArg = rest.mutation || queryArgRaw;

            var state = store.getState();
            var query = _lodash2.default.isFunction(queryArg) ? queryArg(state) : queryArg;
            var vars = _lodash2.default.isFunction(varsArg) ? varsArg(state) : varsArg;
            var options = _lodash2.default.isFunction(optionsArg) ? optionsArg(state) : optionsArg;

            var stateVariables = getVariables(state) || {};
            var stateHeaders = getHeaders(state) || {};
            var stateOptions = getOptions(state) || {};

            var outHeaders = _extends({}, stateHeaders, {
              headers: headers
            });

            if (!outHeaders) {
              outHeaders = {};
            }

            var outOptions = _extends({}, stateOptions, options, {
              headers: outHeaders
            });

            var outVars = _extends({}, stateVariables, vars, action.vars || {});
            if (actionReady !== undefined) store.dispatch({
              type: actionReady,
              data: false,
              vars: outVars
            });

            var finalServer = getServer(actionServer === undefined ? server : actionServer, state);

            var fetchMachine = (0, _graphqlFetch2.default)(finalServer, fetch);

            fetchMachine(query, outVars, outOptions).then(function () {
              var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

              var data = _ref4.data;
              var errors = _ref4.errors;

              if (errors) {
                store.dispatch({
                  type: actionError,
                  error: errorTransform(errors),
                  vars: outVars
                });
              } else {
                store.dispatch({
                  type: actionDone,
                  data: transform(data),
                  vars: outVars
                });
                onComplete(null, transform(data), outVars);
              }
            }).catch(function (error) {
              store.dispatch({
                type: actionError,
                error: errorTransform(error),
                vars: outVars
              });
              onComplete(errorTransform(error), null, outVars);
            }).then(function () {
              if (actionReady !== undefined) store.dispatch({
                type: actionReady,
                data: true,
                vars: outVars
              });
            });
          })();
        }
        return next(action);
      };
    };
  };
}

exports.default = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLW1pZGRsZXdhcmUuanMiXSwibmFtZXMiOlsiZ2V0U2VydmVyIiwic2VydmVyIiwic3RhdGUiLCJpc0Z1bmN0aW9uIiwiYWN0aW9ucyIsImdyYXBoQWN0aW9uIiwiZ3JhcGhSZWFkeSIsImdyYXBoRG9uZSIsImdyYXBoRXJyb3IiLCJjb25maWciLCJmZXRjaCIsImFjdGlvbiIsInJlYWR5IiwiZG9uZSIsImVycm9yIiwiZ2V0SGVhZGVycyIsIm5vb3AiLCJnZXRPcHRpb25zIiwiZ2V0VmFyaWFibGVzIiwib25Db21wbGV0ZSIsIm9uQ29tcGxldGVDb25maWciLCJ0cmFuc2Zvcm0iLCJ0cmFuc2Zvcm1Db25maWciLCJpZGVudGl0eSIsImVycm9yVHJhbnNmb3JtIiwiZXJyb3JUcmFuc2Zvcm1Db25maWciLCJ1bmRlZmluZWQiLCJuZXh0IiwidHlwZSIsImdyYXBocWwiLCJkYXRhIiwicXVlcnlBcmdSYXciLCJxdWVyeSIsInZhcnMiLCJ2YXJzQXJnIiwib3B0aW9ucyIsIm9wdGlvbnNBcmciLCJoZWFkZXJzIiwicmVzdCIsImFjdGlvblNlcnZlciIsImFjdGlvblJlYWR5IiwiYWN0aW9uRG9uZSIsImFjdGlvbkVycm9yIiwicXVlcnlBcmciLCJtdXRhdGlvbiIsInN0b3JlIiwiZ2V0U3RhdGUiLCJzdGF0ZVZhcmlhYmxlcyIsInN0YXRlSGVhZGVycyIsInN0YXRlT3B0aW9ucyIsIm91dEhlYWRlcnMiLCJvdXRPcHRpb25zIiwib3V0VmFycyIsImRpc3BhdGNoIiwiZmluYWxTZXJ2ZXIiLCJmZXRjaE1hY2hpbmUiLCJ0aGVuIiwiZXJyb3JzIiwiY2F0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsU0FBU0EsU0FBVCxDQUFtQkMsTUFBbkIsRUFBMkJDLEtBQTNCLEVBQWtDO0FBQ2hDLE1BQUksaUJBQUVDLFVBQUYsQ0FBYUYsTUFBYixDQUFKLEVBQTBCO0FBQ3hCLFdBQU9BLG9CQUFXQyxL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QkFBSUEsTUFBSixFQUFZO0FBQ1ZaLHNCQUFNUSxRQUFOLENBQWU7QUFDYnpCLHdCQUFNYyxXQURPO0FBRWI1Qix5QkFBT1UsZUFBZWlDLE1BQWYsQ0FGTTtBQUdieEIsd0JBQU1tQjtBQUhPLGlCQUFmO0FBS0QsZUFORCxNQU1PO0FBQ0xQLHNCQUFNUSxRQUFOLENBQWU7QUFDYnpCLHdCQUFNYSxVQURPO0FBRWJYLHdCQUFNVCxVQUFVUyxJQUFWLENBRk87QUFHYkcsd0JBQU1tQjtBQUhPLGlCQUFmO0FBS0FqQywyQkFBVyxJQUFYLEVBQWlCRSxVQUFVUyxJQUFWLENBQWpCLEVBQWtDc0IsT0FBbEM7QUFDRDtBQUNGLGFBbkJILEVBb0JHTSxLQXBCSCxDQW9CUyxpQkFBUztBQUNkYixvQkFBTVEsUUFBTixDQUFlO0FBQ2J6QixzQkFBTWMsV0FETztBQUViNUIsdUJBQU9VLGVBQWVWLEtBQWYsQ0FGTTtBQUdibUIsc0JBQU1tQjtBQUhPLGVBQWY7QUFLQWpDLHlCQUFXSyxlQUFlVixLQUFmLENBQVgsRUFBa0MsSUFBbEMsRUFBd0NzQyxPQUF4QztBQUNELGFBM0JILEVBNEJHSSxJQTVCSCxDQTRCUSxZQUFNO0FBQ1Ysa0JBQUloQixnQkFBZ0JkLFNBQXBCLEVBQ0VtQixNQUFNUSxRQUFOLENBQWU7QUFDYnpCLHNCQUFNWSxXQURPO0FBRWJWLHNCQUFNLElBRk87QUFHYkcsc0JBQU1tQjtBQUhPLGVBQWY7QUFLTCxhQW5DRDtBQXZEaUQ7QUEyRmxEO0FBQ0QsZUFBT3pCLEtBQUtoQixNQUFMLENBQVA7QUFDRCxPQTlGRDtBQStGRCxLQWhHRDtBQWlHRCxHQWxHRDtBQW1HRDs7a0JBRWNGLE0iLCJmaWxlIjoiZ3JhcGhxbC1taWRkbGV3YXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdyYXBoRmV0Y2hGYWN0b3J5IGZyb20gJy4vZ3JhcGhxbC1mZXRjaCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5mdW5jdGlvbiBnZXRTZXJ2ZXIoc2VydmVyLCBzdGF0ZSkge1xuICBpZiAoXy5pc0Z1bmN0aW9uKHNlcnZlcikpIHtcbiAgICByZXR1cm4gc2VydmVyKHsuLi5zdGF0ZX0pO1xuICB9XG4gIHJldHVybiBzZXJ2ZXI7XG59XG5cbmV4cG9ydCB2YXIgYWN0aW9ucyA9IHtcbiAgZ3JhcGhBY3Rpb246IG51bGwsXG4gIGdyYXBoUmVhZHk6IG51bGwsXG4gIGdyYXBoRG9uZTogbnVsbCxcbiAgZ3JhcGhFcnJvcjogbnVsbCxcbn07XG5cbmZ1bmN0aW9uIGNvbmZpZyh7XG4gIHNlcnZlcixcbiAgZmV0Y2gsXG4gIGFjdGlvbjogZ3JhcGhBY3Rpb24gPSAnR1JBUEgnLFxuICByZWFkeTogZ3JhcGhSZWFkeSA9ICdHUkFQSF9SRUFEWScsXG4gIGRvbmU6IGdyYXBoRG9uZSA9ICdHUkFQSF9ET05FJyxcbiAgZXJyb3I6IGdyYXBoRXJyb3IgPSAnR1JBUEhfRVJST1InLFxuICBnZXRIZWFkZXJzID0gXy5ub29wLFxuICBnZXRPcHRpb25zID0gXy5ub29wLFxuICBnZXRWYXJpYWJsZXMgPSBfLm5vb3AsXG4gIG9uQ29tcGxldGU6IG9uQ29tcGxldGVDb25maWcgPSBfLm5vb3AsXG4gIHRyYW5zZm9ybTogdHJhbnNmb3JtQ29uZmlnID0gXy5pZGVudGl0eSxcbiAgZXJyb3JUcmFuc2Zvcm06IGVycm9yVHJhbnNmb3JtQ29uZmlnID0gXy5pZGVudGl0eVxufSA9IHt9KSB7XG4gIGlmIChmZXRjaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgJ1tHcmFwaFFMIG1pZGRsZXdhcmVdIFxcJ2ZldGNoXFwnIGlzIHJlcXVpcmVkJztcbiAgfVxuXG4gIGFjdGlvbnMgPSB7XG4gICAgLi4uYWN0aW9ucyxcbiAgICBncmFwaEFjdGlvbixcbiAgICBncmFwaFJlYWR5LFxuICAgIGdyYXBoRG9uZSxcbiAgICBncmFwaEVycm9yLFxuICB9O1xuXG4gIHJldHVybiBzdG9yZSA9PiB7XG4gICAgcmV0dXJuIChuZXh0KSA9PiB7XG4gICAgICByZXR1cm4gKGFjdGlvbikgPT4ge1xuICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IGdyYXBoQWN0aW9uIHx8IGFjdGlvbi5ncmFwaHFsKSB7XG5cblxuICAgICAgICAgIGNvbnN0IHtxdWVyeTogcXVlcnlBcmdSYXcsIHZhcnM6IHZhcnNBcmcgPSB7fSwgb3B0aW9uczogb3B0aW9uc0FyZyA9IHt9LCBoZWFkZXJzID0ge30sIC4uLnJlc3R9ID0gKGFjdGlvbi5kYXRhIHx8IHt9KTtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBzZXJ2ZXI6IGFjdGlvblNlcnZlcixcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybUNvbmZpZyxcbiAgICAgICAgICAgIGVycm9yVHJhbnNmb3JtID0gZXJyb3JUcmFuc2Zvcm1Db25maWcsXG4gICAgICAgICAgICBvbkNvbXBsZXRlID0gb25Db21wbGV0ZUNvbmZpZyxcbiAgICAgICAgICAgIHJlYWR5OiBhY3Rpb25SZWFkeSA9IGdyYXBoUmVhZHksXG4gICAgICAgICAgICBkb25lOiBhY3Rpb25Eb25lID0gZ3JhcGhEb25lLFxuICAgICAgICAgICAgZXJyb3I6IGFjdGlvbkVycm9yID0gZ3JhcGhFcnJvcixcbiAgICAgICAgICB9ID0gKGFjdGlvbi5ncmFwaHFsIHx8IHt9KTtcbiAgICAgICAgICBjb25zdCBxdWVyeUFyZyA9IHJlc3QubXV0YXRpb24gfHwgcXVlcnlBcmdSYXc7XG5cbiAgICAgICAgICBjb25zdCBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgY29uc3QgcXVlcnkgPSBfLmlzRnVuY3Rpb24ocXVlcnlBcmcpID8gcXVlcnlBcmcoc3RhdGUpIDogcXVlcnlBcmc7XG4gICAgICAgICAgY29uc3QgdmFycyA9IF8uaXNGdW5jdGlvbih2YXJzQXJnKSA/IHZhcnNBcmcoc3RhdGUpIDogdmFyc0FyZztcbiAgICAgICAgICBjb25zdCBvcHRpb25zID0gXy5pc0Z1bmN0aW9uKG9wdGlvbnNBcmcpID8gb3B0aW9uc0FyZyhzdGF0ZSkgOiBvcHRpb25zQXJnO1xuXG4gICAgICAgICAgY29uc3Qgc3RhdGVWYXJpYWJsZXMgPSBnZXRWYXJpYWJsZXMoc3RhdGUpIHx8IHt9O1xuICAgICAgICAgIGNvbnN0IHN0YXRlSGVhZGVycyA9IGdldEhlYWRlcnMoc3RhdGUpIHx8IHt9O1xuICAgICAgICAgIGNvbnN0IHN0YXRlT3B0aW9ucyA9IGdldE9wdGlvbnMoc3RhdGUpIHx8IHt9O1xuXG4gICAgICAgICAgbGV0IG91dEhlYWRlcnMgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZUhlYWRlcnMsXG4gICAgICAgICAgICBoZWFkZXJzXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmICghb3V0SGVhZGVycykge1xuICAgICAgICAgICAgb3V0SGVhZGVycyA9IHt9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG91dE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZU9wdGlvbnMsXG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgaGVhZGVyczogb3V0SGVhZGVyc1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCBvdXRWYXJzID0ge1xuICAgICAgICAgICAgLi4uc3RhdGVWYXJpYWJsZXMsXG4gICAgICAgICAgICAuLi52YXJzLFxuICAgICAgICAgICAgLi4uKGFjdGlvbi52YXJzIHx8IHt9KVxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKGFjdGlvblJlYWR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgIHR5cGU6IGFjdGlvblJlYWR5LFxuICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgdmFyczogb3V0VmFyc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBmaW5hbFNlcnZlciA9IGdldFNlcnZlcihhY3Rpb25TZXJ2ZXIgPT09IHVuZGVmaW5lZCA/IHNlcnZlciA6IGFjdGlvblNlcnZlciwgc3RhdGUpO1xuXG4gICAgICAgICAgY29uc3QgZmV0Y2hNYWNoaW5lID0gZ3JhcGhGZXRjaEZhY3RvcnkoZmluYWxTZXJ2ZXIsIGZldGNoKTtcblxuICAgICAgICAgIGZldGNoTWFjaGluZShxdWVyeSxcbiAgICAgICAgICAgIG91dFZhcnMsXG4gICAgICAgICAgICBvdXRPcHRpb25zXG4gICAgICAgICAgKVxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhLCBlcnJvcnN9ID0ge30pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yVHJhbnNmb3JtKGVycm9ycyksXG4gICAgICAgICAgICAgICAgICB2YXJzOiBvdXRWYXJzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgICAgdHlwZTogYWN0aW9uRG9uZSxcbiAgICAgICAgICAgICAgICAgIGRhdGE6IHRyYW5zZm9ybShkYXRhKSxcbiAgICAgICAgICAgICAgICAgIHZhcnM6IG91dFZhcnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKG51bGwsIHRyYW5zZm9ybShkYXRhKSwgb3V0VmFycyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogYWN0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yVHJhbnNmb3JtKGVycm9yKSxcbiAgICAgICAgICAgICAgICB2YXJzOiBvdXRWYXJzXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBvbkNvbXBsZXRlKGVycm9yVHJhbnNmb3JtKGVycm9yKSwgbnVsbCwgb3V0VmFycyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoYWN0aW9uUmVhZHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBhY3Rpb25SZWFkeSxcbiAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgICB2YXJzOiBvdXRWYXJzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuIl19