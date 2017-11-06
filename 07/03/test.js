const expect = require('expect.js');
const { throttle } = require('./task');

describe('throttle', () => {
  it('should invoke throttle execution of a function', done => {
    let lastInokeTime = 0;
    let count = 0;
    let invokeCount = 0;
    const intervalTime = 100;

    const wrapperFunction = throttle(intervalTime, () => {
      const currentTime = Date.now();

      invokeCount += 1;

      expect(currentTime - lastInokeTime > intervalTime).to.be.ok();
      lastInokeTime = currentTime;
    });

    const intervalId = setInterval(() => {
      wrapperFunction();
      count += 1;

      if (count > 6) {
        clearInterval(intervalId);
        expect(invokeCount > 3).to.be.ok();
        done();
      }
    }, intervalTime - 50);
  });
});
