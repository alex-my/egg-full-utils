'use strict';

const crypto = require('crypto-js');
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
   * get timestamp
   * now: 2018/9/14 16:30:6
   * time(1, 1, 1, 1) => 1537003806 (2018/9/15 17:30:6)
   * @param {int} day:
   * @param {int} hour:
   * @param {int} min:
   * @param {int} sec:
   * @return {int} :
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

  md5(word) {
    return crypto.MD5(word).toString();
  },

  sha1(word) {
    return crypto.SHA1(word).toString(crypto.enc.Hex);
  },

  sha256(word) {
    return crypto.SHA256(word).toString(crypto.enc.Hex);
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
   * @param {string} word:
   * @return {string} :
   */
  urlEncodeComponent(word) {
    return encodeURIComponent(word);
  },

  /**
   * https%3A%2F%2Fgoogle.com => https://google.com
   * @param {string} word:
   * @return {string} :
   */
  urlDecodeComponent(word) {
    return decodeURIComponent(word);
  },

  /**
   * AES 加密(base64 版本)
   * 加密模式: CBC
   * 填充: pkcs7padding
   * 数据块: 128位
   * 输出: base64
   * @param {string | object} word: 待加密对象
   * @param {string} key: 16字长字符串(字母),utf8编码,共128位
   * @param {string} iv：16字长字符串(字母),utf8编码,共128位
   * @return {string} :
   */
  aesEncrypt(word, key, iv) {
    if (key === undefined || iv === undefined) {
      return null;
    }
    if (key.length !== 16 || iv.length !== 16) {
      return null;
    }

    const parseKey = crypto.enc.Utf8.parse(key);
    const parseIV = crypto.enc.Utf8.parse(iv);

    let parseWord = null;
    const _type = typeof word;
    if (_type === 'string' || _type === 'number') {
      parseWord = crypto.enc.Utf8.parse(word);
    } else {
      parseWord = crypto.enc.Utf8.parse(JSON.stringify(word));
    }

    const encrypted = crypto.AES.encrypt(parseWord, parseKey, {
      iv: parseIV,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    });
    // Base64版本
    return encrypted.toString();
    // 十六进制版本
    // return encrypted.ciphertext.toString();
  },

  /**
   * AES 解密 （base64 版本）
   * 加密模式: CBC
   * 填充: pkcs7padding
   * 数据块: 128位
   * 输出: string
   * @param {string} word: 待解密字符串（ base64 后的数据）
   * @param {string} key: 16字长字符串(字母),utf8编码,共128位
   * @param {string} iv：16字长字符串(字母),utf8编码,共128位
   * @return {string} :
   */
  aesDecrypt(word, key, iv) {
    if (key === undefined || iv === undefined) {
      return null;
    }
    if (key.length !== 16 || iv.length !== 16) {
      return null;
    }

    const parseKey = crypto.enc.Utf8.parse(key);
    const parseIV = crypto.enc.Utf8.parse(iv);
    // const parseHexWord = crypto.enc.Hex.parse(word);
    // const parseWord = crypto.enc.Base64.stringify(parseHexWord);
    const parseWord = word;
    const decrypt = crypto.AES.decrypt(parseWord, parseKey, {
      iv: parseIV,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    });
    return decrypt.toString(crypto.enc.Utf8);
  },


  /**
   * AES 加密(十六进制 版本)
   * 加密模式: CBC
   * 填充: pkcs7padding
   * 数据块: 128位
   * 输出: 十六进制 hex
   * @param {string | object} word: 待加密对象
   * @param {string} key: 16字长字符串(字母),utf8编码,共128位
   * @param {string} iv：16字长字符串(字母),utf8编码,共128位
   * @return {string} :
   */
  aesEncryptHex(word, key, iv) {
    if (key === undefined || iv === undefined) {
      return null;
    }
    if (key.length !== 16 || iv.length !== 16) {
      return null;
    }

    const parseKey = crypto.enc.Utf8.parse(key);
    const parseIV = crypto.enc.Utf8.parse(iv);

    let parseWord = '';
    const _type = typeof word;
    if (_type === 'string' || _type === 'number') {
      parseWord = crypto.enc.Utf8.parse(word);
    } else {
      parseWord = crypto.enc.Utf8.parse(JSON.stringify(word));
    }

    const encrypted = crypto.AES.encrypt(parseWord, parseKey, {
      iv: parseIV,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    });
    // 十六进制版本
    return encrypted.ciphertext.toString();
  },

  /**
   * AES 解密 （十六进制 版本）
   * 加密模式: CBC
   * 填充: pkcs7padding
   * 数据块: 128位
   * 输出: string
   * @param {string} word: 待解密字符串（ base64 后的数据）
   * @param {string} key: 16字长字符串(字母),utf8编码,共128位
   * @param {string} iv：16字长字符串(字母),utf8编码,共128位
   * @return {string} :
   */
  aesDecryptHex(word, key, iv) {
    if (key === undefined || iv === undefined) {
      return null;
    }
    if (key.length !== 16 || iv.length !== 16) {
      return null;
    }

    const parseKey = crypto.enc.Utf8.parse(key);
    const parseIV = crypto.enc.Utf8.parse(iv);
    const parseHexWord = crypto.enc.Hex.parse(word);
    const parseWord = crypto.enc.Base64.stringify(parseHexWord);
    const decrypt = crypto.AES.decrypt(parseWord, parseKey, {
      iv: parseIV,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    });
    return decrypt.toString(crypto.enc.Utf8);
  },
};
