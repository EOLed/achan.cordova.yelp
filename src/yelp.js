angular.module('achan.cordova.yelp', []).provider('yelp', function () {
  var baseUrl = 'http://api.yelp.com/v2';
  var credentials = {};
  this.identify = function (creds) {
    credentials = creds;
  };

  var search = function (services) {
    var $http = services.$http,
        $q = services.$q;

    return function (parameters) {
      var deferred = $q.defer(),
          httpMethod = 'GET',
          url = baseUrl + '/search';

      $http.get(baseUrl + '/search', {
        params: buildSearchParameters(httpMethod, url, parameters)
      }).success(function (data) {
        deferred.resolve(data);
      }).error(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };
  };

  function buildSearchParameters(httpMethod, url, params) {
    params = identifiedParams(params);
    params.oauth_signature = oauthSignature.generate(httpMethod,
                                                     url,
                                                     params,
                                                     credentials.consumerSecret,
                                                     credentials.tokenSecret);

    return params;
  }

  function identifiedParams(params) {
    var timestamp = Date.now();
    params.oauth_consumer_key = credentials.consumerKey;
    params.oauth_token = credentials.token;
    params.oauth_nonce = timestamp;
    params.oauth_timestamp = timestamp;
    params.oauth_signature_method = 'HMAC-SHA1';

    return params;
  }

  this.$get = function ($http, $q) {
    return {
      search: search({ $http: $http, $q: $q })
    };
  };
});
