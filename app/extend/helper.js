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
};
