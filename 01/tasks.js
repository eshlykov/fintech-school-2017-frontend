/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
 */
function getMinMax(string) {
  const result = {
    min: Infinity,
    max: -Infinity
  };

  for (let i = 0; i < string.length;) {
    let number = NaN;

    // Пропускаем несколько первых символов, пока не получим число.
    for (; isNaN(number) && (i < string.length); ++i) {
      number = parseFloat(string.slice(i));
    }

    if (!isNaN(number)) {
      result.min = Math.min(number, result.min);
      result.max = Math.max(number, result.max);

      // Получили число, но все его суффиксы тоже числа. Их нужно пропустить, так что ждем, пока не получим не число
      for (; !isNaN(number) && (i < string.length) && (string[i] !== ' '); ++i) {
        number = parseFloat(string.slice(i));
      }
    }
  }

  return result;
}

/* ============================================= */

/**
 * Напишите рекурсивную функцию вычисления чисел Фибоначчи
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciSimple(x) {
  if (x === 0 || x === 1) {
    return x;
  }
  if (x > 1) {
    return fibonacciSimple(x - 1) + fibonacciSimple(x - 2);
  }

  return undefined;
}

/* ============================================= */

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciWithCache(x) {
  const cache = {
    0: 0,
    1: 1
  };

  function findFibonacciNumber(n) {
    const key = String(n);

    if (cache[key] !== undefined) {
      return cache[key];
    }

    if (n > 1) {
      cache[key] = findFibonacciNumber(n - 1) + findFibonacciNumber(n - 2);
      return cache[key];
    }

    return undefined;
  }

  return findFibonacciNumber(x);
}

/* ============================================= */

/**
 * Напишите функцию printNumbers, выводящую числа в столбцах
 * так, чтобы было заполнено максимальное число столбцов при
 * минимальном числе строк.
 * Разделитель межу числами в строке - один пробел,
 * на каждое число при печати - отводится 2 символа
 * Пример работы: printNumbers(11, 3)
 *  0  4  8
 *  1  5  9
 *  2  6 10
 *  3  7 11
 * @param  {number} max  максимальное число (до 99)
 * @param  {number} cols количество столбцов
 * @return {string}
 */
function printNumbers(max, cols) {
  let result = '';
  const eps = 0.001;
  const rows = Math.ceil((max + 1) / cols - eps);

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; i + j * rows <= max; ++j) {
      const number = i + j * rows;

      result += (number < 10) ? ' ' : '';
      result += (j > 0) ? ' ' : '';
      result += String(number);
    }

    if (i < rows - 1) {
      result += '\n';
    }
  }

  return result;
}

/* ============================================= */

/**
 * Реализуйте RLE-сжатие: AAAB -> A3B, BCCDDDEEEE -> BC2D3E4
 * @param  {string} value
 * @return {string}
 */
function rle(input) {
  let result = '';
  let last = '';
  let counter = 1;

  for (let i = 0; i < input.length; ++i) {
    if (input[i] !== last) {
      result += last;
      result += (counter === 1) ? '' : String(counter);
      counter = 0;
    }

    last = input[i];
    counter += 1;
  }

  result += last;
  result += (counter === 1) ? '' : String(counter);

  return result;
}

module.exports = {
  getMinMax,
  rle,
  printNumbers,
  fibonacciSimple,
  fibonacciWithCache
};
