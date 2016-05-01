'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fecha = require('fecha');

var _fecha2 = _interopRequireDefault(_fecha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var isTimestamp = function isTimestamp(value) {
  return !isNaN(value);
};

var fromTimestamp = function fromTimestamp(stamp) {

  var unix = Number(stamp);
  var date = new Date(unix);
  var natural = _fecha2.default.format(date, 'MMMM D, YYYY');

  return { unix: unix, natural: natural };
};

var fromDate = function fromDate(date) {

  var unix = date.getTime();
  var natural = _fecha2.default.format(date, 'MMMM D, YYYY');

  return { unix: unix, natural: natural };
};

app.get('/:dateString', function (_ref, res) {
  var params = _ref.params;
  var dateString = params.dateString;


  if (isTimestamp(dateString)) {

    return res.json(fromTimestamp(dateString));
  }

  var date = new Date(dateString);

  if (date.toString() === 'Invalid Date') {

    return res.json({ unix: null, natural: null });
  }

  return res.json(fromDate(date));
});

app.listen(8080, function (_) {
  return console.log('listening on 8080');
});