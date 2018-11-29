'use strict';

const {
  app,
  assert,
} = require('egg-mock/bootstrap');

describe('test/full-utils.test.js', () => {


  it('should test ctx', () => {
    const ctx = app.mockContext();
    ctx.resp({
      code: 0,
      data: 'success',
    });
    assert(ctx.body.code === 0 && ctx.body.data === 'success');

    const resultSuccess = ctx.success('login success');
    assert(resultSuccess.code === 'success' && resultSuccess.data === 'login success');

    const resultSuccess2 = ctx.success();
    assert(resultSuccess2.code === 'success' && resultSuccess2.data === null);


    const resultFailed = ctx.failed('failed', 'login failed');
    assert(resultFailed.code === 'failed' && resultFailed.data === 'login failed');

    const resultFailed2 = ctx.failed('failed');
    assert(resultFailed2.code === 'failed' && resultFailed2.data === null);
  });

  it('should test helper getRandomString', () => {
    const ctx = app.mockContext();
    const result = ctx.helper.getRandomString(6);
    assert(result.length === 6);
  });

  it('should test helper getRandomNum', () => {
    const ctx = app.mockContext();
    const result = ctx.helper.getRandomNum(99, 1000);
    assert(result >= 99 && result <= 1000);
  });

  it('should test helper getRandomArray', () => {
    const ctx = app.mockContext();
    const arr = [ 'a', 'c', 'd' ];
    const result = ctx.helper.getRandomArray(arr);
    assert(arr.indexOf(result) !== -1);

    // arr is empty
    assert(ctx.helper.getRandomArray([]) === null);

    // only on element
    assert(ctx.helper.getRandomArray([ 'a' ]) === 'a');
  });

  it('should test helper uuid', () => {
    const ctx = app.mockContext();
    assert(ctx.helper.uuid1().length === 36);
    assert(ctx.helper.uuid4().length === 36);
  });

  it('should test helper time', () => {
    const ctx = app.mockContext();
    const now = ctx.helper.now();
    const time = ctx.helper.time(0, 0, 1, 0);
    assert(time === (now + 60));

    const localTime = ctx.helper.getLocalTime(1536911609);
    assert(localTime === '2018-9-14 15:53:29');

    const todayZero = ctx.helper.todayZero();
    const tomorrowZero = ctx.helper.tomorrowZero();
    assert((todayZero + 24 * 3600) === tomorrowZero);
    assert(parseInt(todayZero % 100) === 0);
  });
});
