/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.all,
 * которая возвращает в качестве результата rejected промис c первым reject value или resolve с массивом resolveValues,
 * в соответствущих исходному массиву промисов позициях, если не было ни одного промиса с reject.
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const values = [];
    let valuesCnt = 0;

    promises.forEach((p, i) => p
      .then(value => {
        values[i] = value;
        valuesCnt += 1;
      }, reject)
      .then(() => {
        if (valuesCnt === promises.length) {
          resolve(values);
        }
      }));
  });
}

module.exports = promiseAll;
