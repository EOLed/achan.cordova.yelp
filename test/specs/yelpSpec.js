describe('Service: yelp', function () {
  var $q, $rootScope, $httpBackend, yelp;

  beforeEach(module('testYelp'));

  beforeEach(inject(function (_$rootScope_, _$q_, _$httpBackend_, _yelp_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    yelp = _yelp_;

    freezeTodayAsMillis(30000);
  }));

  describe('yelp#search', function () {
    var deferred, resolvedData, errorData, apiRequest;

    beforeEach(function () {
      deferred = $q.defer();

      mockOAuthSignatureToReturn('SIGNED');

      yelp.search({ category_filter: 'restaurants' })
          .then(resolvedSearch, rejectedSearch);

      apiRequest = $httpBackend.expectGET('http://api.yelp.com/v2/search?category_filter=restaurants' +
                                          '&oauth_consumer_key=consumerkey' +
                                          '&oauth_nonce=' + Date.now() +
                                          '&oauth_signature=SIGNED' +
                                          '&oauth_signature_method=HMAC-SHA1' +
                                          '&oauth_timestamp=' + Date.now() +
                                          '&oauth_token=token');

      function resolvedSearch(data) {
        resolvedData = data;
      }

      function rejectedSearch(error) {
        errorData = error;
      }
    });

    describe('successful api call', function () {
      beforeEach(function () {
        apiRequest.respond(200, { random: 'data' });
        $httpBackend.flush();
      });

      it('resolves promise with yelp data', function () {
        expect(resolvedData).toEqual({ random: 'data' });
      });
    });

    describe('unsuccessful api call', function () {
      beforeEach(function () {
        apiRequest.respond(500, { random: 'data' });
        $httpBackend.flush();
      });

      it('rejects promise with yelp response', function () {
        expect(errorData).toEqual({ random: 'data' });
      });
    });
  });
});

function freezeTodayAsMillis(millis) {
  spyOn(Date, 'now').andReturn(millis);
}

function mockOAuthSignatureToReturn(signature) {
  spyOn(oauthSignature, 'generate').andReturn('SIGNED');
}
