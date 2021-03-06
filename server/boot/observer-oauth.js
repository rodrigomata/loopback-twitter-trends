'use strict';
const request = require('request');

module.exports = app => {
  const TwitterConnector = app.datasources.twitter.connector;
  return TwitterConnector.observe('before execute', (ctx, next) => {
    const {
      TWITTER_ACCESS_TOKEN,
      TWITTER_CONSUMER_KEY,
      TWITTER_CONSUMER_SECRET
    } = process.env;
    if (!TWITTER_ACCESS_TOKEN) {
      // Exception if credentials haven't been set
      if(!TWITTER_CONSUMER_KEY || !TWITTER_CONSUMER_SECRET) {
        console.error('Export your Twitter consumer key and secrets before!');
        const error = new Error();
        error.status = 403;
        error.message = ctx.req;
        return ctx.end(err, ctx, ctx.req);
      }
      const raw = `${TWITTER_CONSUMER_KEY}:${TWITTER_CONSUMER_SECRET}`;
      const encripted = Buffer.from(raw).toString('base64');
      request({
        method: 'POST',
        url: 'https://api.twitter.com/oauth2/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': `Basic ${encripted}`
        },
        form: {
          grant_type: 'client_credentials'
        }
      }, (err, response, body) => {
        if (err) throw err;
        const parser = JSON.parse(body);
        process.env['TWITTER_ACCESS_TOKEN'] = parser.access_token;
        ctx.req.headers = {
          'Authorization': `Bearer ${TWITTER_ACCESS_TOKEN}`
        };
        return next();
      });
    } else {
      console.info('Token detected and set automatically...');
      ctx.req.headers = {
        'Authorization': `Bearer ${TWITTER_ACCESS_TOKEN}`
      };
      return next();
    }
  });
};