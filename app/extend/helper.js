'use strict';

const crypto = require('crypto-js');
const tripledes = require('crypto-js/tripledes');
const uuid = require('uuid');

module.exports = {
  /**
   * Get a random string, remove the confusing characters by default
   * @param {int} length : Random string length
   * @return {string} : Random string
   */
  getRandomString(length) {
    // Not included: I, i, O, o, 1, 0
    const charters = 'ABCDEFGHJKMNPQRSTWXYZabcdefhjkmnprstwxyz23456789';
    let results = '';
    for (let i = 0; i < length; i++) {
      results += charters.charAt(Math.floor(Math.random() * charters.length));
    }
    return results;
  },

  /**
   * Get random number
   * @param {int} minNum :
   * @param {int} maxNum :
   * @return {int}:
   */
  getRandomNum(minNum, maxNum) {
    [ minNum, maxNum ] = [ maxNum, minNum ];
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
  },

  /**
   * Randomly get one in the array
   * @param {array} arr :
   * @return {object} :
   */
  getRandomArray(arr) {
    if (!arr || arr.length === 0) {
      return null;
    }
    if (arr.length === 1) {
      return arr[0];
    }
    return arr[Math.floor(Math.random() * arr.length)];
  },

  // by timestamp
  uuid1() {
    return uuid.v1();
  },

  uuid4() {
    return uuid.v4();
  },

  /**
   * Second timestamp
   * @return {int} : 1536911609
   */
  now() {
    return parseInt(new Date().getTime() / 1000, 10);
  },

  /**
   * millisecond
   */
  ms() {
    return parseInt(new Date() / 1000, 10);
  },

  /**
   * get timestamp
   * now: 2018/9/14 16:30:6
   * time(1, 1, 1, 1) => 1537003806 (2018/9/15 17:30:6)
   *
   * @param {int} day
   * @param {int} hour
   * @param {int} min
   * @param {int} sec
   * @return {int}
   */
  time(day, hour, min, sec) {
    const cur = new Date();
    day = day || 0;
    hour = cur.getHours() + hour + day * 24;
    min = cur.getMinutes() + min;
    sec = cur.getSeconds() + sec;
    return parseInt(cur.setHours(hour, min, sec) / 1000, 10);
  },

  /**
   * Convert timestamp to local time
   * @param {int} timestamp : 1536911609
   * @return {string} : 2018-9-14 15:53:29
   */
  getLocalTime(timestamp) {
    return new Date(parseInt(timestamp, 10) * 1000).toLocaleString();
  },

  /**
   * Return the morning timestamp
   * @return {int} :
   */
  todayZero() {
    return parseInt(new Date().setHours(0, 0, 0) / 1000, 10);
  },

  /**
   * Return the morning timestamp of tomorrow
   * @return {int} :
   */
  tomorrowZero() {
    return parseInt(new Date().setHours(24, 0, 0) / 1000, 10);
  },

  // eg: 20191231
  day() {
    const d = new Date();
    return `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`;
  },

  md5(word) {
    return crypto.MD5(word).toString();
  },

  sha1(word) {
    return crypto.SHA1(word).toString(crypto.enc.Hex);
  },

  sha224(word) {
    return crypto.SHA224(word).toString(crypto.enc.Hex);
  },

  sha256(word) {
    return crypto.SHA256(word).toString(crypto.enc.Hex);
  },

  sha384(word) {
    return crypto.SHA384(word).toString(crypto.enc.Hex);
  },

  sha512(word) {
    return crypto.SHA512(word).toString(crypto.enc.Hex);
  },

  hmacMD5(word, secret) {
    return crypto.HmacMD5(word, secret).toString(crypto.enc.Hex);
  },

  hmacSHA1(word, secret) {
    return crypto.HmacSHA1(word, secret).toString(crypto.enc.Hex);
  },

  hmacSHA256(word, secret) {
    return crypto.HmacSHA256(word, secret).toString(crypto.enc.Hex);
  },

  hmacSHA512(word, secret) {
    return crypto.HmacSHA512(word, secret).toString(crypto.enc.Hex);
  },

  base64Encode(word) {
    return crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(word));
  },

  base64Decode(word) {
    return crypto.enc.Base64.parse(word).toString(crypto.enc.Utf8);
  },

  // encodeURI编码,不会对特殊符号编码
  urlEncode(word) {
    return encodeURI(word);
  },

  urlDecode(word) {
    return decodeURI(word);
  },

  /**
   * encodeURIComponent编码方式,会对特殊符号编码
   * https://google.com => https%3A%2F%2Fgoogle.com
   * @param {string} word
   * @return {string}
   */
  urlEncodeComponent(word) {
    return encodeURIComponent(word);
  },

  /**
   * https%3A%2F%2Fgoogle.com => https://google.com
   * @param {string} word
   * @return {string}
   */
  urlDecodeComponent(word) {
    return decodeURIComponent(word);
  },

  /**
   * AES 加密
   * 填充: pkcs7padding
   * 数据块: 128位
   * @param {string} word : 要加密的内容
   * @param {string} key : 密钥
   * @param {string} iv : 密钥偏移量
   * @param {CBC | ECB | CTR | CFB | OFB} mode : 默认 CBC
   * @param {boolean} isBase64 : 返回值是否是 base64，默认 true
   * @return {string} 加密的内容
   */
  aesEncrypt(word, key, iv, mode = 'CBC', isBase64 = true) {
    const parseKey = crypto.enc.Utf8.parse(key);
    const parseIV = crypto.enc.Utf8.parse(iv);

    let parseWord = '';
    const _type = typeof word;
    if (_type === 'string' || _type === 'number') {
      parseWord = crypto.enc.Utf8.parse(word);
    } else if (_type === 'object') {
      parseWord = crypto.enc.Utf8.parse(JSON.stringify(word));
    } else {
      return null;
    }

    let realMode = '';
    if (mode === 'CBC') {
      realMode = crypto.mode.CBC;
    } else if (mode === 'ECB') {
      realMode = crypto.mode.ECB;
    } else if (mode === 'CTR') {
      realMode = crypto.mode.CTR;
    } else if (mode === 'CFB') {
      realMode = crypto.mode.CFB;
    } else if (mode === 'OFB') {
      realMode = crypto.mode.OFB;
    } else {
      return null;
    }

    const encrypted = crypto.AES.encrypt(parseWord, parseKey, {
      iv: parseIV,
      mode: realMode,
      padding: crypto.pad.Pkcs7,
    });

    return isBase64 ? encrypted.toString() : encrypted.ciphertext.toString();
  },

  /**
   * AES 解密
   * @param {string} word : 要加密的内容
   * @param {string} key : 密钥
   * @param {string} iv : 密钥偏移量
   * @param {CBC | ECB | CTR | CFB | OFB} mode : 默认 CBC
   * @param {boolean} isBase64 : 返回值是否是 base64，默认 true
   * @return {string} 加密的内容
   */
  aesDecrypt(word, key, iv, mode = 'CBC', isBase64 = true) {
    const parseKey = crypto.enc.Utf8.parse(key);
    const parseIV = crypto.enc.Utf8.parse(iv);

    let parseWord = '';
    if (isBase64) {
      parseWord = word;
    } else {
      const parseHexWord = crypto.enc.Hex.parse(word);
      parseWord = crypto.enc.Base64.stringify(parseHexWord);
    }

    let realMode = '';
    if (mode === 'CBC') {
      realMode = crypto.mode.CBC;
    } else if (mode === 'ECB') {
      realMode = crypto.mode.ECB;
    } else if (mode === 'CTR') {
      realMode = crypto.mode.CTR;
    } else if (mode === 'CFB') {
      realMode = crypto.mode.CFB;
    } else if (mode === 'OFB') {
      realMode = crypto.mode.OFB;
    } else {
      return null;
    }

    const decrypt = crypto.AES.decrypt(parseWord, parseKey, {
      iv: parseIV,
      mode: realMode,
      padding: crypto.pad.Pkcs7,
    });
    const str = decrypt.toString(crypto.enc.Utf8);
    return str;
  },

  /**
   * tripledes 加密
   * @param {string} word : 将要加密的内容
   * @param {string} key : 密钥
   * @return {string} 加密后的内容
   */
  tripleDesEncode(word, key) {
    return tripledes.encrypt(word, key).toString();
  },

  /**
   * tripledes 解密
   * @param {string} word : 已加密的内容
   * @param {string} key : 密钥
   * @return {string} 解密后的内容
   */
  tripleDesDecode(word, key) {
    return tripledes.decrypt(word, key).toString(crypto.enc.Utf8);
  },

  /**
   * desEncrypt
   * @param {string} word : 要加密的内容
   * @param {string} key : 密钥
   * @param {string} iv : 密钥偏移量
   * @param {CBC | ECB | CTR | CFB | OFB} mode : 默认 CBC
   * @param {boolean} isBase64 : 返回值是否是 base64，默认 true
   * @return {string} 加密的内容
   */
  desEncrypt(word, key, iv, mode = 'CBC', isBase64 = true) {
    const parseKey = crypto.enc.Utf8.parse(key);
    const parseIV = crypto.enc.Utf8.parse(iv);

    let parseWord = '';
    const _type = typeof word;
    if (_type === 'string' || _type === 'number') {
      parseWord = crypto.enc.Utf8.parse(word);
    } else if (_type === 'object') {
      parseWord = crypto.enc.Utf8.parse(JSON.stringify(word));
    } else {
      return null;
    }

    let realMode = '';
    if (mode === 'CBC') {
      realMode = crypto.mode.CBC;
    } else if (mode === 'ECB') {
      realMode = crypto.mode.ECB;
    } else if (mode === 'CTR') {
      realMode = crypto.mode.CTR;
    } else if (mode === 'CFB') {
      realMode = crypto.mode.CFB;
    } else if (mode === 'OFB') {
      realMode = crypto.mode.OFB;
    } else {
      return null;
    }

    const encrypted = crypto.DES.encrypt(parseWord, parseKey, {
      iv: parseIV,
      mode: realMode,
      padding: crypto.pad.Pkcs7,
    });
    return isBase64 ? encrypted.toString() : encrypted.ciphertext.toString();
  },

  /**
   * des 解密
   * @param {string} word : 要加密的内容
   * @param {string} key : 密钥
   * @param {string} iv : 密钥偏移量
   * @param {CBC | ECB | CTR | CFB | OFB} mode : 默认 CBC
   * @param {boolean} isBase64 : 返回值是否是 base64，默认 true
   * @return {string} 加密的内容
   */
  desDecrypt(word, key, iv, mode = 'CBC', isBase64 = true) {
    const parseKey = crypto.enc.Utf8.parse(key);
    const parseIV = crypto.enc.Utf8.parse(iv);

    let parseWord = '';
    if (isBase64) {
      parseWord = word;
    } else {
      const parseHexWord = crypto.enc.Hex.parse(word);
      parseWord = crypto.enc.Base64.stringify(parseHexWord);
    }

    let realMode = '';
    if (mode === 'CBC') {
      realMode = crypto.mode.CBC;
    } else if (mode === 'ECB') {
      realMode = crypto.mode.ECB;
    } else if (mode === 'CTR') {
      realMode = crypto.mode.CTR;
    } else if (mode === 'CFB') {
      realMode = crypto.mode.CFB;
    } else if (mode === 'OFB') {
      realMode = crypto.mode.OFB;
    } else {
      return null;
    }

    const decrypt = crypto.DES.decrypt(parseWord, parseKey, {
      iv: parseIV,
      mode: realMode,
      padding: crypto.pad.Pkcs7,
    });
    const str = decrypt.toString(crypto.enc.Utf8);
    return str;
  },
};
