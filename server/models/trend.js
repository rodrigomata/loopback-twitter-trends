'use strict';
const async = require('async');

module.exports = Trend => {
  // Remote Method
  Trend.getTrends = (id = 1, cb) => {
    async.waterfall([
      cb => Trend.app.datasources.twitter.getTrends(id, (err, results) => (err) ? cb(err) : cb(null, results[0].trends)),
      (trend_list, cb) => cb(null, trend_list.sort((a,b) => a.tweet_volume < b.tweet_volume))
    ], cb);
  };

  // Expose Remote Method
  Trend.remoteMethod('getTrends', {
    http: { path: '/:countryId', verb: 'get' },
    accepts: [{
      arg: 'countryId',
      type: 'integer',
      description: 'WOEID',
      required: true,
      http: { source: 'path' }
    }],
    returns: { arg: 'trends', type: 'Trend', root: true },
    description: 'Finds the Twitter Trends of a given place'
  });
};
