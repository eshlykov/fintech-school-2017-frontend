const expect = require('expect.js');
const NumberAndString = require('./task.js');

describe('Lesson 3 - task 1', () => {
  it('should have behavior as expected', () => {
    const values = ['hello', 'javascript', 'world'];
    const instances = values.map(str => new NumberAndString(str));

    const resultConcatenation = instances.join(' ');
    const resultCharCount = instances.reduce((obj, memo) => memo + obj, 0);

    expect(resultConcatenation).to.eql('hello javascript world');
    expect(resultCharCount).to.eql(20);
  });
});
