'use strict';
const async = require('async');

module.exports = Trend => {
  // Remote Method
  Trend.getTrends(id = 1, cb) => {
    async.waterfall([
      cb => Trend.app.datasources.twitter.getTrends(id, cb),
      (trend_list, cb) => cb(null, trend_list[0].trends)
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
    returns: { arg: 'trends', type: 'array', root: true }.
    description: 'Finds the Twitter Trends of a given place'
  });
};
