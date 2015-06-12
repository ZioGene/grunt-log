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

  var semver = require('semver');

  var jsFiles = [
    'Gruntfile.js',
    'tasks/*.js',
    'test/**/*.js'
  ];

  var currentVersion = grunt.file.readJSON('package.json').version;

  // Project configuration.
  grunt.initConfig({
    bump: {
      options: {
        pushTo: 'origin',
        tagName: '%VERSION%',
      }
    },

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

    prompt: {
      bump: {
        options: {
          questions: [
            {
              config:  'bump.options.setVersion',
              type:    'list',
              message: 'Bump version from ' + currentVersion.cyan + ' to:',
              choices: [
                {
                  value: semver.inc(currentVersion, 'patch'),
                  // name:  'Patch:  '.yellow + semver.inc('<%= pkg.version %>', 'patch').yellow +
                  name:  ('Patch:  ' + semver.inc(currentVersion, 'patch')).yellow +
                  '   Backwards-compatible bug fixes.'
                },
                {
                  value: semver.inc(currentVersion, 'minor'),
                  name:  ('Minor:  ' + semver.inc(currentVersion, 'minor')).yellow +
                  '   Add functionality in a backwards-compatible manner.'
                },
                {
                  value: semver.inc(currentVersion, 'major'),
                  name:  ('Major:  ' + semver.inc(currentVersion, 'major')).yellow +
                  '   Incompatible API changes.'
                },
                {
                  value: 'custom',
                  name:  'Custom: ?.?.?'.yellow +
                  '   Specify version...'
                }
              ]
            },
            {
              config:   'bump.options.setVersion',
              type:     'input',
              message:  'What specific version would you like',
              when:     function(answers) {
                return answers['bump.increment'] === 'custom';
              },
              validate: function(value) {
                var valid = semver.valid(value) && true;
                return valid || 'Must be a valid semver, such as 1.2.3-rc1. See ' +
                  'http://semver.org/'.blue.underline + ' for more details.';
              }
            },
            {
              config:  'bump.files',
              type:    'checkbox',
              message: 'Apply new version to:',
              choices: [
                {
                  value:   'package',
                  name:    'package.json' +
                  (!grunt.file.isFile('package.json') ? ' file not found, will create one'.grey : ''),
                  checked: grunt.file.isFile('package.json')
                },
                {
                  value:   'bower',
                  name:    'bower.json' +
                  (!grunt.file.isFile('bower.json') ? ' file not found, will create one'.grey : ''),
                  checked: grunt.file.isFile('bower.json')
                },
                {
                  value:   'git',
                  name:    'git tag',
                  checked: grunt.file.isDir('.git')
                }
              ]
            }
          ]
        }
      }
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

  grunt.registerTask('deploy', [
    'prompt',
    'test',
    'bump',
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);
};
