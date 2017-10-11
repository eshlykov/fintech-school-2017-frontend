function delayPromise(promise, timeout) {
  let resolveValue = null;
  let rejectValue = null;

  promise.then(
    value => resolveValue = value,
    err => rejectValue = err
  );

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (resolveValue !== null) {
        resolve(resolveValue);
      } else if (rejectValue !== null) {
        reject(rejectValue);
      } else {
        promise.then(resolve, reject);
      }
    }, timeout);
  });
}

module.exports = {
  delayPromise
};