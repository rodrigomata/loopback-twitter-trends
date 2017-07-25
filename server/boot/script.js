const loopback = require('loopback');

const ds = loopback.createDataSource({
  name: "TwitterDS",
  connector: require("loopback-connector-rest"),
  debug: false,
  baseURL: "https://api.twitter.com/1.1",
  crud: false,
  headers: {
    "accepts": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer {^token}"
  },
  operations: [
    {
      template: {
        "method": "GET",
        "url": "trends/place",
        "query": {
          "id": "{^id=1:number}",
          "exclude": "{exclude:string}"
        }
      },
      functions: {
        "getTrends": ["token","id","exclude"]
      }
    }
  ]
});
