function main() {
  let input = require('fs')
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('\n');
  let n = Number(input.length);

  const solution = (str) => {
    const stack = new Stack();
    const words = str.split('');
    words.map((word) => {
      if (word === '(' || word == '[') {
        stack.push(word);
      } else if (word === ')') {
        if (stack.getTopElement() === '(') stack.pop();
        else stack.push(word);
      }
      if (word === ']') {
        if (stack.getTopElement() === '[') stack.pop();
        else stack.push(word);
      }
    });

    return stack.size();
  };
  for (let i = 0; i < n; i++) {
    if (input[i][0] === '.') continue;
    let isValid = solution(input[i]);
    if (!isValid) console.log('yes');
    else console.log('no');
  }
}
class Stack {
  constructor() {
    this.stack = {};
    this.top = 0;
  }

  size() {
    return this.top;
  }

  push(element) {
    this.stack[this.top] = element;
    this.top += 1;
  }

  getTopElement() {
    return this.stack[this.top - 1];
  }

  pop() {
    let temp;
    if (this.top > 0) {
      temp = this.stack[this.top - 1];
      delete this.stack[this.top - 1];
      this.top -= 1;
    }
    return temp;
  }
}

main();
