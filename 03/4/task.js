/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.race,
 * которая возвращает в качестве результата промис c первым resolve value или reject value в массиве исходных промисов
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */

function promiseRace(promises) {
  return Promise.resolve(null);
}

module.exports = promiseRace;
