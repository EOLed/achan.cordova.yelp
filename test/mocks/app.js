angular.module('testYelp', ['achan.cordova.yelp'])
  .config(function (yelpProvider) {
    yelpProvider.identify({
      consumerKey: 'consumerkey',
      consumerSecret: 'consumersecret',
      token: 'token',
      tokenSecret: 'tokensecret'
    });
  });
