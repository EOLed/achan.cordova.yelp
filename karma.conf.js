module.exports = function(config) {
  config.set({
    basePath: 'src',

    frameworks: ['jasmine'],

    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/components/**/*.js'
    ],

    reporters: ['progress'],

    exclude: [],

    port: 8080,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    singleRun: false
  });
};
