![Build Status](https://travis-ci.org/rodrigomata/nodejs-loopback-twitter-trends.svg?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/snyk/goof/badge.svg)](https://snyk.io/test/github/rodrigomata/nodejs-loopback-twitter-trends)
# Loopback REST Demo

This project demonstrates the usage of Loopback REST connector with Twitter to fetch the Top Trends.

I created this project because Loopback's documentation wasn't very clear with managing REST APIs that need Authentication.

The Trend model doesn't save data or validates constraints, as it's only for demonstration purposes.

### How does it work?

1. Datasource templates are defined depending on the endpoints that need to be called. Be aware that in Twitter some endpoints end with .json, and the full URL is needed. [Link](https://loopback.io/doc/en/lb3/REST-connector.html#configuring-a-rest-data-source)

**/server/datasources.json**

2. In order to request any method, in the Twitter API for example, an authentication header needs to be sent. You can define a datasource template; however, it's kind of tricky to access datasources if you are not inside a Loopback Model or in the root of the project, and it's cleaner to set an observer that intercepts the calls made to the REST connector. [Link](https://loopback.io/doc/en/lb3/Working-with-LoopBack-objects.html#getting-the-app-object)

**/server/boot/observer-oauth.js**

3. Access the loopback object and the twitter datasource in the model. In case you need to access it from other script outside the /server folder, you need to set a relative path to the /server folder (wtf) or use the correct approach as written in their docs. [Link](http://loopback.io/doc/en/lb3/Working-with-LoopBack-objects.html#getting-references-to-data-sources)  

**/server/models/trend.js**

## Requirements

- NodeJS 8.x

## Stack

- ES6
- Loopback 3.x
- Loopback Boot 2.x
- Loopback Explorer 4.x
- Loopback REST Connector 2.x
- Async 2.x

### Commit Style

Please consider the following git styles for committs:

http://udacity.github.io/git-styleguide/

### Building

Install the dependencies before start:

```sh
$ sudo npm i -g strongloop
$ sudo npm i -g loopback-cli
$ cd loopback-twitter-trends
$ sudo npm i -d
```

Export your Twitter Credentials or run Node with these environment variables:

(If you are using Windows):
```sh
$env:TWITTER_CONSUMER_KEY= "<consumer_key>"
```

```sh
$ export TWITTER_CONSUMER_KEY=<consumer_key>
$ export TWITTER_CONSUMER_SECRET=<consumer_secret>
```

If you already have a valid User/Application token, you can also define it. In case there's no token set, an observer intercepts the REST call and tries to fetch a new one:

```sh
$ export TWITTER_ACCESS_TOKEN=<access_token>
```

Run Node:

```sh
$ node .
```

User you API at http://localhost:3000/explorer

[Find your WOEID](http://www.woeidlookup.com/)

## License

MIT
