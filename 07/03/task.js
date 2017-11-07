/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */
function throttle(time, callback) {
  let prevInvokeTime = -time;

  return () => {
    const invokeTime = Date.now();

    if (invokeTime - prevInvokeTime > time) {
      prevInvokeTime = invokeTime;
      callback();
    }
  };
}

module.exports = { throttle };
