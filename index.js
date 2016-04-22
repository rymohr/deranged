'use strict';

// For now we only support integer ranges
//
// TODO: add some tests
//
// deranged.parse('2005..2008,2010,2015..2018') => [2005, 2006, 2007, 2008, 2010, 2015, 2016, 2017, 2018]
// deranged.stringify([2005, 2006, 2007, 2008, 2010, 2015, 2016, 2017, 2018]) => '2005..2008,2010,2015..2018'
var RANGE = /^\d+[.]{2}\d+$/;

function parse(raw) {
  var values = [];
  var tokens = raw.split(',');

  tokens.forEach(function(token) {
    if (RANGE.test(token)) {
      var match = token.split('..');
      var rangeBegin = match[0];
      var rangeEnd = match[1];

      for (var value = rangeBegin; value <= rangeEnd; value++) {
        values.push(Number(value));
      }
    } else {
      values.push(Number(token))
    }
  })

  return values;
}

function stringify(values) {
  var tokens = [];
  var rangeBegin = null;

  for (var i = 0; i < values.length; i++) {
    var value = values[i];
    var nextValue = values[i + 1];

    if (nextValue === value + 1) {
      if (rangeBegin === null) rangeBegin = value;
    } else {
      if (rangeBegin === null) {
        tokens.push(value);
      } else {
        tokens.push(rangeBegin + '..' + value);
        rangeBegin = null;
      }
    }
  }

  return tokens.join(',');
}

module.exports = {parse: parse, stringify: stringify};
