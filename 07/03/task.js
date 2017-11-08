/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */
function throttle(time, callback) {
  let prevInvokeTime = -time;

  return (...args) => {
    const invokeTime = Date.now();

    if (invokeTime - prevInvokeTime > time) {
      prevInvokeTime = invokeTime;
      callback(...args);
    }
  };
}

module.exports = { throttle };
