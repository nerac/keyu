/* global it describe */
const assert = require('assert');
const { setPrecision, parseOr, jsonOr, intOr, floatOr } = require('../conversions');
const { identity } = require('../logic');

describe('Conversions', function() {
  describe('#jsonOr()', function() {
    it('should return default value if empty', function() {
      assert.strictEqual(jsonOr(0)(null), 0);
      assert.strictEqual(jsonOr(0)(''), 0);
      assert.strictEqual(jsonOr(0)(), 0);
      assert.strictEqual(jsonOr(1)(0), 0);
      assert.strictEqual(jsonOr(0)('asdffsda'), 0);
      assert.deepStrictEqual(jsonOr(0)('{a:b}'), 0);
    });
    it('should return empty object if empty object passed', function() {
      assert.deepStrictEqual(jsonOr(0)('{}'), {});
      assert.deepStrictEqual(jsonOr(0)('{"a":{"b":1}}'), { a: { b: 1 } });
    });
    it('should return function returned value if passed a function', function() {
      assert.strictEqual(jsonOr(x => 3)(null), 3);
    });
    it('should return same value if identity is passed as default value', function() {
      assert.strictEqual(jsonOr(identity)(null), null);
    });
  });
  describe('#floatOr()', function() {
    it('should return default value if empty', function() {
      assert.strictEqual(floatOr(0)(null), 0);
      assert.strictEqual(floatOr(0)(), 0);
      assert.strictEqual(floatOr(0)('xxxx'), 0);
      assert.strictEqual(floatOr(0)('x3x'), 0);
      assert.strictEqual(floatOr(1)(0), 0);
    });
    it('should return value if is a float', function() {
      assert.strictEqual(floatOr(0)(1.1), 1.1);
      assert.strictEqual(floatOr(0)('1.1'), 1.1);
      assert.strictEqual(floatOr(0)('1.123456789'), 1.123456789);
    });
    it('should return function returned value if passed a function', function() {
      assert.strictEqual(floatOr(x => 3)(null), 3);
    });
    it('should return same value if identity is passed as default value', function() {
      assert.strictEqual(floatOr(identity)(null), null);
    });
  });
  describe('#intOr()', function() {
    it('should return default value if empty', function() {
      assert.strictEqual(intOr(0)(null), 0);
      assert.strictEqual(intOr(0)(), 0);
      assert.strictEqual(intOr(0)('xxxx'), 0);
      assert.strictEqual(intOr(0)('x3x'), 0);
      assert.strictEqual(intOr(1)(0), 0);
    });
    it('should return value if is a int', function() {
      assert.strictEqual(intOr(0)(1), 1);
      assert.strictEqual(intOr(0)('1'), 1);
    });
    it('should return an int if passed a float', function() {
      assert.strictEqual(intOr(0)(1.1), 1);
      assert.strictEqual(intOr(0)('1.9'), 1);
    });
    it('should return function returned value if passed a function', function() {
      assert.strictEqual(intOr(x => 3)(null), 3);
    });
    it('should return same value if identity is passed as default value', function() {
      assert.strictEqual(intOr(identity)(null), null);
    });
  });
  describe('#setPrecision()', function() {
    it('should return with no decimals if 0 passed', function() {
      assert.strictEqual(setPrecision(0, 1.3), 1);
    });
    it('should return with no decimals if wrong precision passed', function() {
      assert.strictEqual(setPrecision(null, 1.3), 1);
      assert.strictEqual(setPrecision(undefined, 1.3), 1);
    });
    it('should return the exact decimals passed', function() {
      assert.strictEqual(setPrecision(2, 1.12345), 1.12);
    });
    it('should return decimals rounded', function() {
      assert.strictEqual(setPrecision(3, 1.12345), 1.123);
      assert.strictEqual(setPrecision(4, 1.12345), 1.1235);
    });
  });
  describe('#parseOr()', function() {
    it('should return default value if parser throws an exception', function() {
      assert.strictEqual(
        parseOr(x => {
          throw Error('whatever');
        })(33)(1),
        33
      );
    });
    it('should return value if identity passes as a parser', function() {
      assert.strictEqual(parseOr(identity)(33)(1), 1);
      assert.strictEqual(parseOr(identity)(33)(0), 0);
    });
  });
});
