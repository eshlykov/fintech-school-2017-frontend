const fs = require('fs');
const validator = require('html-validator');

Promise.all(
  process.argv.slice(2).map(filename => new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject('File read error: ', err);
      }

      validator({ data, format: 'text' }).then(result => {
        console.log(filename, result);
        resolve(result.includes('The document validates according to the specified schema'));
      }).catch(reject);
    });
  }))
).then(results => {
  if (results.every(r => r)) {
    console.log('All files are valid');
    process.exit(0);
  } else {
    console.log('Some files are invalid');
    process.exit(1);
  }
}).catch(err => {
  console.error('Error occured:', err);
  process.exit(1);
});

