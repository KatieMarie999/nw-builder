/*:
-------------------------------------------------------------------------
@title Recording Detector 
@author Riley 

*/

exec = require('child_process').exec;

function RecordingDetector() {

}
(function () {

  RecordingDetector.isStreaming = function () {
    var value = false;
    checkStreaming(value);
    return value;
  };

  function checkStreaming(worked) {
    var platform = process.platform;
    var cmd = '';
    switch (platform) {
      case 'win32': cmd = 'tasklist';
        break;
      case 'darwin': cmd = 'ps -ax | grep ${query}';
        break;
      case 'linux': cmd = 'ps -A';
        break;
      default:
        return false;
    }
    exec(cmd, (err, stdout, stderr), function () {
      if (err) {
        worked = false;
      }
      // Using obs 
      if (stdout.toLowerCase().indexOf("obs32") > -1 ||
        stdout.toLowerCase().indexOf("obs64") > -1) {

        worked = true;
        return;
      }
      else {
        worked = false;
      }
    });
  }
})();