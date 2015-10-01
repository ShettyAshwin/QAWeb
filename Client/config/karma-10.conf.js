// Karma configuration
// Generated on Fri Jan 03 2014 14:10:30 GMT-0800 (Pacific Standard Time)

module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // frameworks to use
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'app/lib/angular/angular.js',
            'app/lib/angular/angular-*.js',
            'app/lib/angular-translate/*.js',
            'app/lib/angular-translate-*/*.js',
            'test/lib/angular/angular-mocks.js',
            'app/lib/appConfiguration.js',
            'app/js/app.js',


            'app/js/**/**/*.js',
            'test/unit/**/**/*.js' //Error




            //'app/views/embedding/embedding-popup.html',

            //'test/data/*.js',

        ],
        // list of files to exclude
        exclude: [
            'app/lib/angular/angular-loader.js',
            'app/lib/angular/*.min.js',
            'app/lib/angular/angular-scenario.js',
        ],

        preprocessors: {

            'app/js/**/**/*.js': ['coverage']

        },

        ngHtml2JsPreprocessor: {
            // strip app from the file path
            stripPrefix: 'app/'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        junitReporter: {
            type: 'xml',
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        coverageReporter: {
            //type: 'html', dir: 'result/'
            reporters: [
                {type: 'html', dir: 'result/'},
                {type: 'lcov', dir:'result/'}
            ]
        },
        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'junit', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['Chrome'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
