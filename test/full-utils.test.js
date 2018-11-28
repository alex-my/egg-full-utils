'use strict';

const mock = require('egg-mock');

describe('test/full-utils.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/full-utils-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, fullUtils')
      .expect(200);
  });
});
