var exec = require('child_process').exec;

var testMessageWasOutputTwice = function(test, msg, stdout) {
  // we expect to see the message twice:
  // - once in the name of the task run
  // - a second time as the log itself
  var first = stdout.indexOf(msg);
  var last = stdout.lastIndexOf(msg);
  test.ok(first > -1, 'message "' + msg + '" should be output');
  test.ok(last > -1, 'message "' + msg + '" should be output');
  test.ok(first !== last, 'message "' + msg + '" should be output twice');
};

exports.tests = {
  logMessageOk: function(test) {
    test.expect(3);
    var msg = 'HelloWorld!';
    var cmd = 'grunt log:' + msg;
    exec(cmd, function(error, stdout) {
      testMessageWasOutputTwice(test, msg, stdout);
      test.done();
    });
  },
  logMessageWithSpace: function(test) {
    test.expect(3);
    var msg = 'Hello World!';
    var cmd = 'grunt log:"' + msg + '"';
    exec(cmd, function(error, stdout) {
      testMessageWasOutputTwice(test, msg, stdout);
      test.done();
    });
  },
  logMessageWithSemiColons: function(test) {
    test.expect(3);
    var msg = 'hello:world : again:';
    var cmd = 'grunt log:"' + msg + '"';
    exec(cmd, function(error, stdout) {
      testMessageWasOutputTwice(test, msg, stdout);
      test.done();
    });
  },
};
