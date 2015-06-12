/*
 * grunt-log
 * https://github.com/xavierpriour/grunt-log
 *
 * Logs messages to grunt console
 *
 * Acceptable targets/arguments:
 * - log:<messags> logs the message, as would grunt.log
 *
 * Copyright (c) 2015 Xavier Priour
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {
  grunt.registerTask('log', function(text) {
    for (var i = 1; i < arguments.length; i++) {
      text += ':' + arguments[i];
    }
    grunt.log.write(text);
  });
};
