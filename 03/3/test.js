const expect = require('expect.js');
const promiseAll = require('./task.js');
const { delayPromise } = require('../utils.js');

describe('Lesson 3 - task 3', () => {
  it('should be rejected if one was rejected', done => {
    promiseAll([
      Promise.reject('test_error'),
      Promise.resolve('test_value')
    ]).then(
      value => done(new Error(`Resolution with ${value}`)),
      errValue => {
        expect(errValue).to.eql('test_error');
        done();
      }
    );
  });

  it('should be resolved if all were resolved', done => {
    promiseAll([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ]).then(
      values => {
        expect(values).to.eql([1, 2, 3]);
        done();
      },
      errValue => done(new Error(`Rejection with ${errValue}`))
    );
  });

  it('should be rejected if one was rejected with delay', done => {
    promiseAll([
      delayPromise(Promise.reject('test_error'), 1000),
      Promise.resolve(2),
      Promise.resolve(3)
    ]).then(
      value => done(new Error(`Resolution with ${value}`)),
      errValue => {
        expect(errValue).to.eql('test_error');
        done();
      }
    );
  });

  it('should be resolved if all were resolved with delay', done => {
    promiseAll([
      delayPromise(Promise.resolve(1), 200),
      delayPromise(Promise.resolve(2), 300),
      Promise.resolve(3)
    ]).then(
      values => {
        expect(values).to.eql([1, 2, 3]);
        done();
      },
      errValue => done(new Error(`Rejection with ${errValue}`))
    );
  });
});
