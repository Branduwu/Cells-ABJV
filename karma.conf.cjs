module.exports = function(config) {
  config.set({
    // Base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // Frameworks to use
    frameworks: ['mocha'], // O 'jasmine' si usas Jasmine

    // List of files / patterns to load in the browser
    files: [
      'src/**/*.js',
      'test/**/*.spec.js'
    ],

    // List of files to exclude
    exclude: [],

    // Preprocess matching files before serving them to the browser
    preprocessors: {
      'src/**/*.js': ['babel'],
      'test/**/*.spec.js': ['babel']
    },

    // Babel preprocessor specific configuration
    babelPreprocessor: {
      options: {
        presets: ['@babel/preset-env'],
        sourceMap: 'inline'
      }
    },

    // Test results reporter to use
    reporters: ['mocha'],

    // Web server port
    port: 9876,

    // Enable / disable colors in the output (reporters and logs)
    colors: true,

    // Level of logging
    logLevel: config.LOG_INFO,

    // Enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers
    browsers: ['Chrome'], // O 'Firefox' si usas Firefox

    // Continuous Integration mode
    singleRun: false,

    // Concurrency level
    concurrency: Infinity
  });
};
