/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */
function throttle(time, callback) {
  let canBeInvoked = true;

  return (...args) => {
    if (canBeInvoked) {
      canBeInvoked = false;
      callback(...args);
      setTimeout(() => { canBeInvoked = true; }, time);
    }
  };
}

module.exports = { throttle };
