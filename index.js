// For now we only support integer ranges
//
// TODO: add some tests
//
// deranged.parse('2005..2008,2010,2015..2018') => [2005, 2006, 2007, 2008, 2010, 2015, 2016, 2017, 2018]
// deranged.stringify([2005, 2006, 2007, 2008, 2010, 2015, 2016, 2017, 2018]) => '2005..2008,2010,2015..2018'
let RANGE = /^\d+[.]{2}\d+$/;

export function parse(raw, options = {numeric: true}) {
  let values = [];
  let tokens = raw.split(',');

  tokens.forEach((token) => {

    if (RANGE.test(token)) {
      let [ rangeBegin, rangeEnd ] = token.split('..');

      for (var value = rangeBegin; value <= rangeEnd; value++) {
        values.push(parseValue(value, options));
      }
    } else {
      values.push(parseValue(token, options))
    }
  })

  return values;
}

export function stringify(values) {
  let tokens = [];
  let rangeBegin = null;

  for (var i = 0; i < values.length; i++) {
    let value = values[i];
    let nextValue = values[i + 1];

    if (nextValue === value + 1) {
      if (rangeBegin === null) rangeBegin = value;
    } else {
      if (rangeBegin === null) {
        tokens.push(value);
      } else {
        tokens.push(`${rangeBegin}..${value}`);
        rangeBegin = null;
      }
    }
  }

  return tokens.join(',');
}

function parseValue(value, options) {
  return options && options.numeric ? Number(value) : value;
}

export default { parse, stringify };
