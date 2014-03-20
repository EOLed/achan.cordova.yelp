achan.cordova.yelp
==================

Angular provider to query the Yelp API

## Configuration

    angular.module('myApp', ['achan.cordova.yelp'])
      .config(function (yelpProvider) {
        yelpProvider.identify({
          consumerKey: '<consumer key>',
          consumerSecret: '<consumer secret>',
          token: '<token>',
          tokenSecret: '<token secret>'
        });
      });
