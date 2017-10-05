/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */
function timer1(logger = console.log) {
  for (var i = 0; i < 10; ++i) {
    setTimeout(x => {
      logger(x);
    }, 100, i);
  }
}

function timer2(logger = console.log) {
  for (let i = 0; i < 10; ++i) {
    setTimeout(() => {
      logger(i);
    }, 100);
  }
}

/*= ============================================ */

/**
 * Создайте собственную реализацию функции bind
 * @param {Function} func передаваемая функция
 * @param {any} context контекст
 * @param {Array<any>} args массив аргументов
 * @return {Function} функция с нужным контекстом
 */
function customBind(func, context, ...args) {
  return function binded(...added) {
    return func.apply(context, args.concat(added));
  };
}

/*= ============================================ */

/**
 * Напишите функцию sum, вычисляющую суммы подобным образом:
 * sum(1)(2)( ) // 3
 * sum(1)(2)(3)( ) // 6
 * sum :: Number -> sum
 * sum :: void -> Number
 */
function sum(x) {
  let currentSum = 0;

  return (function count(y) {
    if (y === undefined) {
      return currentSum;
    }

    currentSum += y;
    return count;
  }(x));
}

/*= ============================================ */

/**
 * Определите, являются ли строчки анаграммами (например, “” — “терпеливость”).
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
function anagram(first, second) {
  if (first.length !== second.length) {
    return false;
  }

  const chars = {};

  [...first].forEach(char => { chars[char] = (chars[char] || 0) + 1; });
  [...second].forEach(char => { chars[char] = (chars[char] || 0) - 1; });

  return Object.keys(chars).map(key => chars[key]).every(number => number === 0);
}

/*= ============================================ */

/**
 * Сократите массив до набора уникальных значений
 * [1,1, 2, 6, 3, 6, 2] → [1, 2, 3, 6]
 * @param {Array<number>} исходный массив
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
function getUnique(arr) {
  const items = {};

  arr.forEach(item => { items[item] = null; });

  return Object.keys(items).sort((a, b) => a - b);
}

/**
 * Найдите пересечение двух массивов
 * [1, 3, 5, 7, 9] и [1, 2, 3, 4] → [1, 3]
 * @param {Array<number>, Array<number>} first, second исходные массивы
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
function getIntersection(first, second) {
  const inFirst = {};
  const result = [];

  first.forEach(item => { inFirst[item] = (inFirst[item] || 0) + 1; });

  second.forEach(item => {
    if (inFirst[item] > 0) {
      inFirst[item] -= 1;
      result.push(item);
    }
  });

  return result.sort((a, b) => a - b);
}

/* ============================================= */

/**
 * Две строки называются изоморфными, когда в строке A можно заменить
 * конкретный символ на любой другой для получения строки B. (Расстояние Левенштейна, при возможных мутациях
 * ограничивающихся заменой символа - отличается на 1).
 * Отдельно стоит отметить что строка изоморфна самой себе.
 * Порядок символов должен остаться неизменным. Каждый
 * последовательный символ в строке A сравнивается с
 * каждым последовательным символов в строке B.
 *
 * @param  {string} left
 * @param  {string} right
 * @return {boolean}
 */
function isIsomorphic(left, right) {
  if (left.length !== right.length) {
    return false;
  }

  let different = 0;

  for (let i = 0; i <= left.length; ++i) {
    if (left[i] !== right[i]) {
      different += 1;
    }
    if (different > 1) {
      return false;
    }
  }

  return true;
}
module.exports = {
  timer1,
  timer2,
  customBind,
  sum,
  anagram,
  getUnique,
  getIntersection,
  isIsomorphic
};
