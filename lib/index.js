'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlMiddleware = require('./graphql-middleware');

var _graphqlMiddleware2 = _interopRequireDefault(_graphqlMiddleware);

var _graphqlReducer = require('./graphql-reducer');

var _graphqlReducer2 = _interopRequireDefault(_graphqlReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = {
  graphqlMiddleware: _graphqlMiddleware2.default,
  graphqlReducer: _graphqlReducer2.default
};

exports.default = graphql;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJncmFwaHFsIiwiZ3JhcGhxbE1pZGRsZXdhcmUiLCJncmFwaHFsUmVkdWNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsVUFBVTtBQUNkQyxnREFEYztBQUVkQztBQUZjLENBQWhCOztrQkFLZUYsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25maWcgZnJvbSAnLi9ncmFwaHFsLW1pZGRsZXdhcmUnO1xuaW1wb3J0IHJlZHVjZXIgZnJvbSAnLi9ncmFwaHFsLXJlZHVjZXInO1xuXG5jb25zdCBncmFwaHFsID0ge1xuICBncmFwaHFsTWlkZGxld2FyZTogY29uZmlnLFxuICBncmFwaHFsUmVkdWNlcjogcmVkdWNlcixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdyYXBocWw7Il19