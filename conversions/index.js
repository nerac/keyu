const { either, fnOrValue } = require('../logic');
const { curry } = require('../fp');

const parseOr = curry((parser, def) =>
  either(data => {
    let res = parser(data);
    return res || (res === 0 ? res : fnOrValue(def, data));
  }, def)
);

const jsonOr = parseOr(JSON.parse);
const floatOr = parseOr(parseFloat);
const intOr = parseOr(num => parseInt(`${num}`));

const setPrecision = curry((value, num) => +num.toFixed(value));

module.exports = { parseOr, jsonOr, floatOr, intOr, setPrecision };
