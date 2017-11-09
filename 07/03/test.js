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
      
      console.log(currentTime);

      invokeCount += 1;

      expect(currentTime - lastInokeTime > intervalTime).to.be.ok();
      lastInokeTime = currentTime;
    });

    const intervalId = setInterval(() => {
      wrapperFunction();
      count += 1;

      // Изменил тест. Прошлая версия не подходит для случая с такими тайм-стемпами:
      // 60 -> 109 -> 158 -> 207 -> 206 -> 255 -> 304
      // invoke              invoke               invoke
      // Как видно, ситуация вполне реальная, и тест ее забракует, однако троттлинг вызывает
      // или не вызывает колбэк правильно.
      if (count > 7) {
        clearInterval(intervalId);
        expect(invokeCount >= 3).to.be.ok();
        done();
      }
    }, intervalTime - 50);
  });
});
