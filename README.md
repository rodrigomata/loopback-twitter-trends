# Loopback REST Demo

This project demonstrates the usage of Loopback REST connector with Twitter to fetch the Top Trends.

## Requirements

- NodeJS 8.x

## Stack

- ES6
- Loopback 3.x
- Loopback Boot 2.x
- Loopback Explorer 4.x
- Loopback Timestamp 3.x
- Async 2.x

### Commit Style

Please consider de following git styles for the commit messages:

http://udacity.github.io/git-styleguide/

### Building

Install the dependencies before start:

```sh
$ sudo npm i -g strongloop
$ sudo npm i -g loopback-cli
$ cd loopback-twitter-trends
$ sudo npm i -d
```

Export your Twitter Credentials:

```sh
$ export TWITTER_CONSUMER_KEY=<consumer_key>
$ export TWITTER_CONSUMER_SECRET=<consumer_secret>
```

Run Node:

```sh
$ node .
```

## License

MIT
