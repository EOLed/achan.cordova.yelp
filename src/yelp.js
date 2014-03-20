angular.module('achan.cordova.yelp', []).provider('yelp', function () {
  var baseUrl = 'http://api.yelp.com/v2';
  var credentials = {};
  this.identify = function (creds) {
    credentials = creds;
    console.log('credentials: ' + creds.consumerKey);
  };

  var search = function ($http) {
    return function (parameters) {
      var httpMethod = 'GET',
          url = baseUrl + '/search';

      parameters = identifiedParams(parameters);
      var encodedSignature = oauthSignature.generate(httpMethod,
                                                     url,
                                                     parameters,
                                                     credentials.consumerSecret,
                                                     credentials.tokenSecret);

      return $http.get(baseUrl + '/search',
                       { params: { category_filter: 'restaurants',
                                   oauth_consumer_key: credentials.consumerKey, 
                                   oauth_token: credentials.token,
                                   oauth_signature_method: 'HMAC-SHA1',
                                   oauth_signature: encodedSignature,
                                   oauth_timestamp: parameters.oauth_timestamp,
                                   oauth_nonce: parameters.oauth_nonce } });
    };
  };

  function identifiedParams(params) {
    var timestamp = Date.now();
    params.oauth_consumer_key = credentials.consumerKey;
    params.oauth_token = credentials.token;
    params.oauth_nonce = timestamp;
    params.oauth_timestamp = timestamp;
    params.oauth_signature_method = 'HMAC-SHA1';

    return params;
  }

  this.$get = function ($http) {
    return {
      search: search($http)
    };
  };
});
