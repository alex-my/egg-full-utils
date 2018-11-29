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

  it('should test helper encrypt', () => {
    const ctx = app.mockContext();
    const {
      helper,
    } = ctx;
    const text = 'egg-full-utils@';
    const secret = '123456';

    assert(helper.md5(text) === '59fbb9dd748f540edf0816e4e7b4b33e');
    assert(helper.sha1(text) === '1ddce4c2702bcc16ca31bf5c31df0fb59f4373dd');
    assert(helper.sha256(text) === 'a2c8ba1a24bceb7f5e09dfc6b87bccc99be25a5548312959766bcfc104e1465c');
    assert(helper.sha512(text) === '07eeafb8ab9911259e2947204642d04f8a263393d4cfdf7b40d867814b23cb8cbde0edf9761545569393af5b2cd38ee2b0ad75f0d9d0f33565b072f56a8df885');
    assert(helper.hmacMD5(text, secret) === '247db6e322857c2cc3052360983c286b');
    assert(helper.hmacSHA1(text, secret) === 'c261bedc2e88ef531997e61dcd1e3615f504c490');
    assert(helper.hmacSHA256(text, secret) === 'b5f2f3f089daec13f680a64566f5af85bbe388d0ca7d1f3e16cd51bad22722d1');
    assert(helper.hmacSHA512(text, secret) === '20fb13ff0721231c36d961d514c9b81bd33cb31bb5f0207e8f24f2e25a06172824ed3c746c408a68da659a682cbb79ec9c324a6bb80617f9fc80fe40640f59b4');

    const url = 'https://google.com';
    assert(helper.base64Encode(url) === 'aHR0cHM6Ly9nb29nbGUuY29t');
    assert(helper.base64Decode('aHR0cHM6Ly9nb29nbGUuY29t') === url);
    assert(helper.urlEncode(url) === url);
    assert(helper.urlDecode(url) === url);
    assert(helper.urlEncodeComponent(url) === 'https%3A%2F%2Fgoogle.com');
    assert(helper.urlDecodeComponent('https%3A%2F%2Fgoogle.com') === url);
  });

  it('should test helper aesEncrypt and aesDecrypt', () => {
    const ctx = app.mockContext();
    const {
      helper,
    } = ctx;

    const text = 'egg-full-utils';
    const result = 'o8rI4f5urYP7LfWrbYdwCg==';

    const key = '6KENQcQQpWomHxTS';
    const iv = 'mdJGzJeFL9guBbpX';
    const en = helper.aesEncrypt(text, key, iv);
    assert(en === result);

    const de = helper.aesDecrypt(result, key, iv);
    assert(de === text);

    assert(helper.aesEncrypt(text) === null);
    assert(helper.aesEncrypt(text, 'lessthen16', 'lessthen16') === null);
    assert(helper.aesEncrypt([ '1', '2' ], key, iv) === 'xoVXWOX01hS7KwebqJxvdg==');

    assert(helper.aesDecrypt(result) === null);
    assert(helper.aesDecrypt(result, 'lessthen16', 'lessthen16') === null);
  });

  it('should test helper aesEncryptHex and aesDecryptHex', () => {
    const ctx = app.mockContext();
    const {
      helper,
    } = ctx;

    const text = 'egg-full-utils';
    const result = 'a3cac8e1fe6ead83fb2df5ab6d87700a';

    const key = '6KENQcQQpWomHxTS';
    const iv = 'mdJGzJeFL9guBbpX';
    const en = helper.aesEncryptHex(text, key, iv);
    assert(en === result);

    const de = helper.aesDecryptHex(result, key, iv);
    assert(de === text);

    assert(helper.aesEncryptHex(text) === null);
    assert(helper.aesEncryptHex(text, 'lessthen16', 'lessthen16') === null);
    assert(helper.aesEncryptHex([ '1', '2' ], key, iv) === 'c6855758e5f4d614bb2b079ba89c6f76');

    assert(helper.aesDecryptHex(result) === null);
    assert(helper.aesDecryptHex(result, 'lessthen16', 'lessthen16') === null);
  });
});
