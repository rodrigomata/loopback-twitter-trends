const server = require('../server/server');
const loopback = require('loopback');

const chai = require('chai');
const expect = chai.expect;
const request = require('supertest')(server);

describe('Twitter Trends Integration Testing', () => {
  xit('Should call getTrends with default id', done => {
    request.get('/api/trends/getTrends/1')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an.array();

        done();
      });
  });
})