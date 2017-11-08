const input = document.querySelector('.tel');

const isCodeOfDigit = n => (n >= 48 && n <= 57) || (n >= 96 && n <= 105);

const isCodeOfBackspace = n => n === 8;

const isCodeOfDelete = n => n === 46;

const isCodeOfFuncKey = n => (n <= 7) || (n >= 9 && n <= 31) || (n >= 33 && n <= 45) || (n >= 91 && n <= 94)
                             || (n >= 112 && n <= 135) || n === 144 || n === 145;

function printKey(key) {
  const value = this.value;
  const offset = '+7 ('.length;
  const current = this.selectionStart;

  if (current === value.length) {
    return;
  }
  const next = current < offset ? offset : current + value.slice(current).search(/[_0-9]/);

  this.value = value.slice(0, next) + key + value.slice(next + 1);
  this.setSelectionRange(next + 1, next + 1);
}

function removePrev() {
  const value = this.value;
  const offset = '+7 ('.length;
  const current = this.selectionStart;

  if (current <= offset) {
    return;
  }

  const lastReplacable = value.slice(0, current).match(/[_0-9]/g).pop();
  const next = value.slice(0, current).lastIndexOf(lastReplacable);

  this.value = `${value.slice(0, next)}_${value.slice(next + 1)}`;
  this.setSelectionRange(next, next);
}

function ignoreNotDigits(event) {
  if (isCodeOfFuncKey(event.keyCode)) {
    return;
  }
  event.preventDefault();

  if (isCodeOfDigit(event.keyCode)) {
    printKey.apply(this, [event.key]);
  } else if (isCodeOfDelete(event.keyCode)) {
    printKey.apply(this, ['_']);
  } else if (isCodeOfBackspace(event.keyCode)) {
    removePrev.apply(this);
  }
}

input.addEventListener('keydown', ignoreNotDigits);
