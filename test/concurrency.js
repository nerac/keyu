/* global it describe */
const assert = require('assert');
require('../concurrency');

const e1 = new Error(1);
const e2 = new Error(2);

describe('Concurrency', function() {
  describe('#Promise.any()', function() {
    it('should return an array of value objects if there is no exception', async function() {
      let res = await Promise.any([Promise.resolve(1), Promise.resolve(2)]);
      assert.deepStrictEqual(res, [{ value: 1 }, { value: 2 }]);
    });
    it('should return an array of error objects if there no exception', async function() {
      let res = await Promise.any([Promise.reject(e1), Promise.reject(e2)]);
      assert.deepStrictEqual(res, [{ error: e1 }, { error: e2 }]);
    });
    it('should return an array mixed value and error objects', async function() {
      let res = await Promise.any([Promise.resolve(1), Promise.reject(e2), Promise.resolve(3)]);
      assert.deepStrictEqual(res, [{ value: 1 }, { error: e2 }, { value: 3 }]);
    });
  });
  describe('#Promise.best()', function() {
    it('should return the first result', async function() {
      let res = await Promise.best([Promise.resolve(1), Promise.resolve(2)]);
      assert.deepStrictEqual(res, 1);
    });
    it('should return the first good result', async function() {
      let res = await Promise.best([Promise.reject(e1), Promise.resolve(2), Promise.resolve(3)]);
      assert.deepStrictEqual(res, 2);
    });
    it('should return an exception with all error objects', async function() {
      try {
        await Promise.best([Promise.reject(e1), Promise.reject(e2)]);
        assert.fail();
      } catch (e) {
        assert.deepStrictEqual(e, [e1, e2]);
      }
    });
  });
});
