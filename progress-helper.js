var _total = 0;
var _current = 0;

function printProgress() {
  var columns = process.stdout.columns;
  var message = ' ' + _current + ' / ' + _total + ' ';
  columns = columns - message.length;
  var multiplyer = _total / columns;
  var current = _current / multiplyer;

  process.stdout.write('\r');

  for (let i = 0; i < columns; i++) {
    if (i < current) {
      process.stdout.write('█')
    } else {
      process.stdout.write('░')
    }
  }

  process.stdout.write(message);

  if (_current === _total) {
    process.stdout.write('\n');
  }
}

function clearProgress() {
  var columns = process.stdout.columns;

  process.stdout.write('\r');

  for (let i = 0; i < columns; i++) {
    process.stdout.write(' ');
  }

  process.stdout.write('\r');
}

module.exports.setTotal = (total) => _total = total;
module.exports.setCurrent = (current) => _current = current + 1;
module.exports.printProgress = () => printProgress();
module.exports.clearProgress = () => clearProgress();
