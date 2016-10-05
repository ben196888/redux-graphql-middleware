'use strict';

// assert stub

function assert(isOk, err) {
  if (!isOk) {
    throw err;
  }
}

/**
 * create a graphql-fetch bound to a specific graphql url
 * @param  {String} graphqlUrl
 * @return {Function} graphqlFetch
 */
module.exports = function factory(graphqlUrl, fetch) {

  /**
   * graphql fetch - fetch w/ smart defaults for graphql requests
   * @param  {Query} query graphql query
   * @param  {Object} vars  graphql query args
   * @param  {Object} opts  fetch options
   * @return {FetchPromise} fetch promise
   */
  return function graphqlFetch(query, vars, opts) {
    assert(query, 'query is required');
    vars = vars || {};
    opts = opts || {};
    opts.body = JSON.stringify({
      query: query,
      variables: vars
    });
    // default opts
    opts.method = opts.method || 'POST';
    opts.headers = opts.headers || {};

    // default headers
    var headers = opts.headers;
    if (!headers['content-type']) {
      opts.headers['content-type'] = 'application/json';
    }
    return fetch(graphqlUrl, opts).then(function (res) {
      return res.json();
    });
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLWZldGNoLmpzIl0sIm5hbWVzIjpbImFzc2VydCIsImlzT2siLCJlcnIiLCJtb2R1bGUiLCJleHBvcnRzIiwiZmFjdG9yeSIsImdyYXBocWxVcmwiLCJmZXRjaCIsImdyYXBocWxGZXRjaCIsInF1ZXJ5IiwidmFycyIsIm9wdHMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInZhcmlhYmxlcyIsIm1ldGhvZCIsImhlYWRlcnMiLCJ0aGVuIiwicmVzIiwianNvbiJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBQ0EsU0FBU0EsTUFBVCxDQUFpQkMsSUFBakIsRUFBdUJDLEdBQXZCLEVBQTRCO0FBQzFCLE1BQUksQ0FBQ0QsSUFBTCxFQUFXO0FBQ1QsVUFBTUMsR0FBTjtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7O0FBS0FDLE9BQU9DLE9BQVAsR0FBaUIsU0FBU0MsT0FBVCxDQUFrQkMsVUFBbEIsRUFBOEJDLEtBQTlCLEVBQXFDOztBQUdwRDs7Ozs7OztBQU9BLFNBQU8sU0FBU0MsWUFBVCxDQUF1QkMsS0FBdkIsRUFBOEJDLElBQTlCLEVBQW9DQyxJQUFwQyxFQUEwQztBQUMvQ1gsV0FBT1MsS0FBUCxFQUFjLG1CQUFkO0FBQ0FDLFdBQU9BLFFBQVEsRUFBZjtBQUNBQyxXQUFPQSxRQUFRLEVBQWY7QUFDQUEsU0FBS0MsSUFBTCxHQUFZQyxLQUFLQyxTQUFMLENBQWU7QUFDekJMLGFBQU9BLEtBRGtCO0FBRXpCTSxpQkFBV0w7QUFGYyxLQUFmLENBQVo7QUFJQTtBQUNBQyxTQUFLSyxNQUFMLEdBQWNMLEtBQUtLLE1BQUwsSUFBZSxNQUE3QjtBQUNBTCxTQUFLTSxPQUFMLEdBQWVOLEtBQUtNLE9BQUwsSUFBZ0IsRUFBL0I7O0FBRUE7QUFDQSxRQUFJQSxVQUFVTixLQUFLTSxPQUFuQjtBQUNBLFFBQUksQ0FBQ0EsUUFBUSxjQUFSLENBQUwsRUFBOEI7QUFDNUJOLFdBQUtNLE9BQUwsQ0FBYSxjQUFiLElBQStCLGtCQUEvQjtBQUNEO0FBQ0QsV0FBT1YsTUFBTUQsVUFBTixFQUFrQkssSUFBbEIsRUFBd0JPLElBQXhCLENBQTZCLFVBQVVDLEdBQVYsRUFBZTtBQUNqRCxhQUFPQSxJQUFJQyxJQUFKLEVBQVA7QUFDRCxLQUZNLENBQVA7QUFHRCxHQXBCRDtBQXFCRCxDQS9CRCIsImZpbGUiOiJncmFwaHFsLWZldGNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbi8vIGFzc2VydCBzdHViXG5mdW5jdGlvbiBhc3NlcnQgKGlzT2ssIGVycikge1xuICBpZiAoIWlzT2spIHtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbn1cblxuLyoqXG4gKiBjcmVhdGUgYSBncmFwaHFsLWZldGNoIGJvdW5kIHRvIGEgc3BlY2lmaWMgZ3JhcGhxbCB1cmxcbiAqIEBwYXJhbSAge1N0cmluZ30gZ3JhcGhxbFVybFxuICogQHJldHVybiB7RnVuY3Rpb259IGdyYXBocWxGZXRjaFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZhY3RvcnkgKGdyYXBocWxVcmwsIGZldGNoKSB7XG5cblxuICAvKipcbiAgICogZ3JhcGhxbCBmZXRjaCAtIGZldGNoIHcvIHNtYXJ0IGRlZmF1bHRzIGZvciBncmFwaHFsIHJlcXVlc3RzXG4gICAqIEBwYXJhbSAge1F1ZXJ5fSBxdWVyeSBncmFwaHFsIHF1ZXJ5XG4gICAqIEBwYXJhbSAge09iamVjdH0gdmFycyAgZ3JhcGhxbCBxdWVyeSBhcmdzXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0cyAgZmV0Y2ggb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtGZXRjaFByb21pc2V9IGZldGNoIHByb21pc2VcbiAgICovXG4gIHJldHVybiBmdW5jdGlvbiBncmFwaHFsRmV0Y2ggKHF1ZXJ5LCB2YXJzLCBvcHRzKSB7XG4gICAgYXNzZXJ0KHF1ZXJ5LCAncXVlcnkgaXMgcmVxdWlyZWQnKVxuICAgIHZhcnMgPSB2YXJzIHx8IHt9XG4gICAgb3B0cyA9IG9wdHMgfHwge31cbiAgICBvcHRzLmJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBxdWVyeTogcXVlcnksXG4gICAgICB2YXJpYWJsZXM6IHZhcnNcbiAgICB9KVxuICAgIC8vIGRlZmF1bHQgb3B0c1xuICAgIG9wdHMubWV0aG9kID0gb3B0cy5tZXRob2QgfHwgJ1BPU1QnO1xuICAgIG9wdHMuaGVhZGVycyA9IG9wdHMuaGVhZGVycyB8fCB7fTtcblxuICAgIC8vIGRlZmF1bHQgaGVhZGVyc1xuICAgIHZhciBoZWFkZXJzID0gb3B0cy5oZWFkZXJzO1xuICAgIGlmICghaGVhZGVyc1snY29udGVudC10eXBlJ10pIHtcbiAgICAgIG9wdHMuaGVhZGVyc1snY29udGVudC10eXBlJ10gPSAnYXBwbGljYXRpb24vanNvbic7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaChncmFwaHFsVXJsLCBvcHRzKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgfSlcbiAgfVxufVxuIl19