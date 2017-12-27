'use strict';
const request = require('request');

module.exports = app => {
  const TwitterConnector = app.dataSources.twitter.connector;
  return TwitterConnector.observe('before execute', (ctx, next) => {
    console.info('Setting OAuth header...');
    if(!process.env.TWITTER_ACCESS_TOKEN) {
      console.info('No token found, requesting a new one...');
      const raw = `${process.env.TWITTER_CONSUMER_KEY}:${process.env.TWITTER_CONSUMER_SECRET}`;
      // Exception if credentials haven't been set
      if(!raw) {
        console.error('Export your Twitter consumer key and secrets before!');
        const error = new Error();
        error.status = 403;
        error.message = ctx.req;
        return ctx.end(err, ctx, ctx.req);
      }
      const encripted = Buffer.from(raw).toString('base64');
      request({
        method: 'POST',
        url: 'https://api.twitter.com/oauth2/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': `Basic ${encripted}`
        },
        form: { grant_type: 'client_credentials' }
      }, (err, response, body) => {
        if(err) throw err;
        console.info('Token requested manually...');
        let parser = JSON.parse(body);
        process.env['TWITTER_ACCESS_TOKEN'] = parser.access_token;
        ctx.req.headers = { 'Authorization': `Bearer ${process.env.TWITTER_ACCESS_TOKEN}` };
        return next();
      });
    } else {
      console.info('Token detected and set automatically...');
      ctx.req.headers = { 'Authorization': `Bearer ${process.env.TWITTER_ACCESS_TOKEN}` };
      return next();
    }
  });
};
