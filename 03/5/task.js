/**
 * Изменить поведение чисел таким образом, чтобы указанные конструкции были эквивалетны при условии,
 * что римские цифры могут быть любыми.
 * 0..V => [0, 1, 2, 3, 4]
 * 0..VII => [0, 1, 2, 3, 4, 5, 6]
 * 0..X => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * Подсказка - необходимо использовать Proxy - объекты
 * */

function fromRoman(str) {
  const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let result = 0;
  let rest = str;

  for (let i = 0; i < decimal.length; ++i) {
    while (rest.indexOf(roman[i]) === 0) {
      result += decimal[i];
      rest = rest.replace(roman[i], '');
    }
  }
  if (rest === '') {
    return result;
  }
  return undefined;
}

Object.setPrototypeOf(Number.prototype, new Proxy(Object.getPrototypeOf(Number.prototype), {
  get: (target, property) => {
    const length = fromRoman(property);

    if (isFinite(length)) {
      return Array.from(new Array(length), (value, index) => index);
    }
    return undefined;
  }
}));
