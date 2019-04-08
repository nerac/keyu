const assert = require('assert');
const { map, filter, reduce } = require('../collections');

const incrementBy = value => data => value + data;
const identity = x => x;
const greaterThan = x => data => data > x;
const get = key => data => data[key];

describe('Collections', function() {
  describe('#reduce()', function() {
    it('should return the sumation of its keys', function() {
      let a = { a: 1, b: 2 };
      let sum = (a, b) => a + b;

      assert.equal(a.reduce(sum, 0), 3);
      assert.equal(reduce(sum, 0, a), 3);
      assert.equal(reduce(sum, 0)(a), 3);
    });
  });
  describe('#map()', function() {
    it('should return same object given identity', function() {
      let a = { a: 1, b: 2 };
      assert.deepEqual(a.map(identity), { a: 1, b: 2 });
      assert.deepEqual(map(identity, a), { a: 1, b: 2 });
    });
    it('should return incrementBy(1) all properties', function() {
      let a = { a: 1, b: 2 };
      assert.deepEqual(a.map(incrementBy(1)), { a: 2, b: 3 });
      assert.deepEqual(map(incrementBy(1), a), { a: 2, b: 3 });
    });
    it('should return the first level', function() {
      let a = { a: { b: 1 }, b: { b: 2 } };
      assert.deepEqual(a.map(get('b')), { a: 1, b: 2 });
      assert.deepEqual(map(get('b'), a), { a: 1, b: 2 });
    });
    it('should return empty object if empty object', function() {
      let a = {};
      assert.deepEqual(a.map(incrementBy(1)), {});
      assert.deepEqual(map(incrementBy(1), a), {});
    });
  });
  describe('#filter()', function() {
    it('should return same object given identity', function() {
      let a = { a: 1, b: 2 };
      assert.deepEqual(a.filter(identity), { a: 1, b: 2 });
      assert.deepEqual(filter(identity, a), { a: 1, b: 2 });
    });
    it('should return only properties greaterThan(1)', function() {
      let a = { a: 1, b: 2 };
      assert.deepEqual(a.filter(greaterThan(1)), { b: 2 });
      assert.deepEqual(filter(greaterThan(1), a), { b: 2 });
    });
    it('should return only properties greaterThan(0)', function() {
      let a = { a: 1, b: 2 };
      assert.deepEqual(a.filter(greaterThan(0)), { a: 1, b: 2 });
      assert.deepEqual(filter(greaterThan(0), a), { a: 1, b: 2 });
    });
    it('should return empty object if no match', function() {
      let a = { a: 1, b: 2 };
      assert.deepEqual(a.filter(greaterThan(5)), {});
      assert.deepEqual(filter(greaterThan(5), a), {});
    });
  });
});
