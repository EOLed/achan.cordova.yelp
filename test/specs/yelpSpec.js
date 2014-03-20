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
    it('returns http promise with oauth credentials from configuration',
        function () {
      mockOAuthSignatureToReturn('SIGNED');
      yelp.search({ category_filter: 'restaurants' });

      $httpBackend.expectGET('http://api.yelp.com/v2/search?category_filter=restaurants' +
                             '&oauth_consumer_key=consumerkey' +
                             '&oauth_nonce=' + Date.now() +
                             '&oauth_signature=SIGNED' +
                             '&oauth_signature_method=HMAC-SHA1' + 
                             '&oauth_timestamp=' + Date.now() +
                             '&oauth_token=token').respond(200);
      $httpBackend.flush();
    });
  });
});

function freezeTodayAsMillis(millis) {
  spyOn(Date, 'now').andReturn(millis);
}

function mockOAuthSignatureToReturn(signature) {
  spyOn(oauthSignature, 'generate').andReturn('SIGNED');
}
