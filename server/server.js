'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

app.start = () => {
  return app.listen(() => {
    app.emit('started');
    let baseUrl = app.get('url').replace(/\/$/, '');
    console.log(`Web server listening at: ${baseUrl}`);
    if (app.get('loopback-component-explorer')) {
      let explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log(`Browse your REST API at ${baseUrl}${explorerPath}`);
    }
  });
};

boot(app, __dirname, err => {
  if (err) throw err;
  if (require.main === module)
    app.start();
});
