// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to exclude
    exclude: [],

      // list of files / patterns to load in the browser
      files: [
          'app/bower_components/angular/angular.js',
          'app/bower_components/angular-mocks/angular-mocks.js',
          'app/bower_components/angular-resource/angular-resource.js',
          'app/bower_components/angular-sanitize/angular-sanitize.js',
          'app/bower_components/angular-route/angular-route.js',
          'bower_components/underscore/underscore.js',
          'app/scripts/lib/*.js',
          'app/scripts/billApp/app.js',
          'app/scripts/components/**/*.module.js',
          'app/scripts/components/**/*.service.js',
          'app/scripts/billApp/*.controller.js',
          'app/scripts/billApp/*.service.js',
          'app/scripts/testing/jasmineMatchers/*.js',
          'app/scripts/testing/mocks/mocksModule.js',
          'app/scripts/testing/mocks/*.js',
          'app/scripts/components/**/*.spec.js',
          'app/scripts/billApp/*.spec.js'
      ],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, it captures browsers, runs tests and exits
    singleRun: false
  });
};
