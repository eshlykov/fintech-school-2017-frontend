const expect = require('expect.js');
const promiseRace = require('./task.js');
const { delayPromise } = require('../utils.js');

describe('Lesson 3 - task 4', () => {
  it('should be rejected if firstly one of the promises was rejected', done => {
    promiseRace([
      delayPromise(Promise.reject('test_error'), 500),
      delayPromise(Promise.resolve('test_value'), 1000)
    ]).then(
      value => done(new Error(`Resolution with ${value}`)),
      errValue => {
        expect(errValue).to.eql('test_error');
        done();
      }
    );
  });

  it('should be resolved if firstly one of the promises was resolved', done => {
    promiseRace([
      delayPromise(Promise.reject('test_error'), 1000),
      delayPromise(Promise.resolve('test_value'), 500)
    ]).then(
      values => {
        expect(values).to.eql('test_value');
        done();
      },
      errValue => done(new Error(`Rejection with ${errValue}`))
    );
  });
});
