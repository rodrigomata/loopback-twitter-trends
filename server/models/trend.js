'use strict';

module.exports = Trend => {
  // Remote Method
  Trend.getTrends = async function (countryId = 1, cb) {
    try {
      const results = await Trend.app.datasources.twitter.getTrends(countryId);
      cb(null, results[0].trends.sort((a, b) => a.tweet_volume < b.tweet_volume));
    } catch (err) {
      cb(err);
    }
  };

  // Expose Remote Method
  Trend.remoteMethod('getTrends', {
    http: {
      path: '/:countryId',
      verb: 'get'
    },
    accepts: [{
      arg: 'countryId',
      type: 'integer',
      description: 'WOEID',
      required: true,
      http: {
        source: 'path'
      }
    }],
    returns: {
      arg: 'trends',
      type: 'Trend',
      root: true
    },
    description: 'Finds the Twitter Trends of a given place'
  });
};