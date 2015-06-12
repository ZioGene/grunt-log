# grunt-log
Grunt task to output log statements easily.

```js
grunt.registerTask('build', [
  'log:build started',
  'jshint',
  'less',
  'log:hint and less done',
  (... other build steps ...),
  'log: build finished'
]);
```

## Install
You need node, npm, and grunt already installed, then:
```
npm install grunt-log --save-dev
```

Once the plugin has been installed, load it in your Gruntfile.
I recommend [load-grunt-tasks](https://www.npmjs.org/package/load-grunt-tasks),
but you can do it the traditional, painful way by adding to your Gruntfile:
```js
grunt.loadNpmTasks('grunt-log');
```

## Usage
Just call the `log` task, with the message to log as its first parameter
(separated from the task by a `:`), as part of your multi-step task definition:
```js
  grunt.registerTask('build', 'builds all elements', [
    'prompt:bump',
    'bump',
    'log: now starting build',
    'stage:prod',
    'release',
    'log: build successful',
  ]);
```

## Contributing
 1. fork it: https://github.com/xavierpriour/grunt-log/fork
 2. clone your fork.
 3. install everything: `npm install`
 4. test everything is ok: `grunt` - this task will watch for file updates
 5. **add tests** for your contribution - we use nodeunit
 6. have a go!
 7. ensure all tests run ok: `grunt test`
 8. update that README
 9. create a pull request
10. thank you so much!

## Release History
__0.0__: initial commit (2015/06/12)

  * no code yet.