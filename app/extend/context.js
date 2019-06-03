'use strict';

module.exports = {
  // controller
  resp({
    code = this.app.config.fullUtils.success, // error code
    data = null,
  }) {
    this.body = {
      code,
      data,
    };
    this.status = 200;
  },

  // service
  success(data = null) {
    return {
      code: this.app.config.fullUtils.success,
      data,
    };
  },

  // service
  failed(code, data = null) {
    return {
      code, // error code
      data,
    };
  },
};