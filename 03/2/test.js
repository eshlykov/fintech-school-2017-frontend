const expect = require('expect.js');
const rejectOnTimeout = require('./task.js');
const { delayPromise } = require('../utils.js');

describe('Lesson 3 - task 2', () => {
  it('should work as initial resolved promise', done => {
    rejectOnTimeout(Promise.resolve(10), 1000).then(value => {
      expect(value).to.eql(10);
      done();
    }, e => done(new Error(`Rejection with ${e}`)));
  });

  it('should work as initial rejected promise', done => {
    rejectOnTimeout(Promise.reject(10), 1000).then(
      value => e => done(new Error(`Resolved with ${value}`)),
      errValue => {
        expect(errValue).to.eql(10);
        done();
      }
    );
  });

  it('should work as reject delayed rejection', done => {
    rejectOnTimeout(delayPromise(Promise.reject('test_value'), 1000), 500).then(
      value => done(new Error(`Resolved with ${value}`)),
      errValue => {
        expect(errValue).to.eql('timeout_error');
        done();
      }
    );
  });

  it('should work as reject delayed resoluton', done => {
    rejectOnTimeout(delayPromise(Promise.resolve('test_value'), 1000), 500).then(
      value => done(new Error(`Resolved with ${value}`)),
      errValue => {
        expect(errValue).to.eql('timeout_error');
        done();
      }
    );
  });
});
