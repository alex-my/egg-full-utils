# egg-full-utils

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-full-utils.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-full-utils
[travis-image]: https://img.shields.io/travis/eggjs/egg-full-utils.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-full-utils
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-full-utils.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-full-utils?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-full-utils.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-full-utils
[snyk-image]: https://snyk.io/test/npm/egg-full-utils/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-full-utils
[download-image]: https://img.shields.io/npm/dm/egg-full-utils.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-full-utils

<!--
Description here.
-->

## 依赖

> crypto-js@3.1.9-1
> uuid@3.3.2

## 安装

```bash
$ npm i egg-full-utils --save
```

## 使用

```js
// config/plugin.js
exports.fullUtils = {
  enable: true,
  package: 'egg-full-utils',
};
```

## 配置

```js
// {app_root}/config/config.default.js
exports.fullUtils = {
  /**
   * 后台响应返回格式被固定为: {code, data}
   * 当返回 ctx.success(data) 时，code 为此配置中的 success
   * 一般设置为 0, success 等
   */
  success: 'success',
};
```

## 示例

```js
'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    /**
     * get: /login?name=xxx&password=123456
     * response: { code: success, data: { userId }}, status: 200
     */
    async login() {
      const result = this.service.user.verify();
      ctx.resp(result);
    }
  }
  return UserController;
};

module.exports = app => {
  class UserService extends app.Service {
    async verify() {
      const { ctx } = this;

      const payload = ctx.request.body || {};

      // get user from db or cache by payload.name
      const user = {
        userId: '10001',
        password: '07e38ba001d5df0dd4488cdf0d5ab8ea',
        salt: 'P7yRKQymchIZ5ZpP',
      };

      // check password
      if (user.password !== ctx.helper.md5(payload.password + salt)) {
        return ctx.failed('password error');
      }

      return ctx.success({ userId: user.userId });
    }
  }
  return UserService;
};
```

## License

[MIT](LICENSE)
