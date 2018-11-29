'use strict';

// TODO: time.js, encrypt.js
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
};
