/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */
function throttle(time, callback) {
  let lastInvoked = -time;

  return (...args) => {
    if (Date.now() - lastInvoked > time) {
      callback(...args);
      lastInvoked = Date.now();
    }
  };
}

module.exports = { throttle };
