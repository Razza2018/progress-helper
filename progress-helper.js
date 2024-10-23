let _total = 0;
let _current = 0;
let isShowing = false;
let _clearTwoLines = false;

/* Overriding console.log */
const _oldConsoleLog = console.log;
const _newConsoleLog = (...rest) => {
	if (isShowing) clearProgress();
	_internalConsoleLog(...rest);
	if (isShowing) printProgress();
};
const _internalConsoleLog = (...rest) => {
	process.stdout.write = _oldStdOutWrite;
	_oldConsoleLog(...rest);
	process.stdout.write = _newStdOutWrite;
};

/* Overriding process.stdout.write */
const _oldStdOutWrite = process.stdout.write.bind(process.stdout);
const _newStdOutWrite = (rest) => {
	// _internalConsoleLog('rest:', JSON.stringify(rest));
	if (isShowing) clearProgress();
	_oldStdOutWrite(rest);

	if (rest.slice(-1) !== '\n') {
		_clearTwoLines = true;
		_oldStdOutWrite('\n');
	}

	if (isShowing) printProgress();
};

console.log = _newConsoleLog;
process.stdout.write = _newStdOutWrite

function printProgress() {
  let columns = process.stdout.columns;
  let message = ' ' + _current + ' / ' + _total + ' ';
  columns = columns - message.length;
  let multiplyer = _total / columns;
  let current = _current / multiplyer;

  _oldStdOutWrite('\r');

  for (let i = 0; i < columns; i++) {
    if (i < current) {
      _oldStdOutWrite('█')
    } else {
      _oldStdOutWrite('░')
    }
  }

  _oldStdOutWrite(message);

  if (_current === _total) {
		isShowing = false;
    _oldStdOutWrite('\n');
  }
}

function clearProgress() {
	_oldStdOutWrite('\r');

	if (_clearTwoLines) {
		_oldStdOutWrite('\x1B[1A');
		_clearTwoLines = false;
	}

	_oldStdOutWrite('\x1B[0J');
}

function setTotal(total) {
	_total = total;
	isShowing = true;
}

function setCurrent(current) {
	_current = current + 1;
	printProgress();
}

module.exports.setTotal = setTotal;
module.exports.setCurrent = setCurrent;
