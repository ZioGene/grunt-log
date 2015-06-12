/*
 * grunt-log
 * https://github.com/xavierpriour/grunt-log
 *
 * Copyright (c) 2015 Xavier Priour
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt); // Load grunt tasks automatically

  var jsFiles = [
    'Gruntfile.js',
    'tasks/*.js',
    'test/**/*.js'
  ];

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: jsFiles,
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      src: jsFiles
    },

    // Unit tests.
    nodeunit: {
      all: ['test/nodeunit/*.js'],
      //one: ['test/<%= grunt.task.current.args[0] %>.js'],
      //stageLocalIsLoaded: 'test/stageLocalIsLoaded.js',
      //hasFailed: 'test/hasFailed.js',
      //stageShouldBeEmpty: 'test/stageIsEmpty_test.js',
    },

    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      task: {
        files: ['tasks/*.js'],
        tasks: ['test'],
      },
      tests: {
        files: ['test/**/*.js'],
        tasks: ['test'],
      },
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.registerTask('examples', 'usage examples', [
    'log:HelloWorld',
    'log:works with spaces as well',
    'log:and:with:semi-colons:',
  ]);

  grunt.registerTask('test', [
    'jshint',
    'jscs',
    'nodeunit:all',
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);
};
