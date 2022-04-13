let n;
let m;
let answer = [];

const dfs = (cur, prev) => {
  if (answer.length === m) {
    console.log(...answer);
    return;
  }
  for (let i = prev; i <= n; i++) {
    answer.push(i);
    dfs(i, answer[answer.length - 1]);
    answer.pop();
  }
};
const solution = () => {
  dfs(1, 1);
};
const read = () => {
  [n, m] = require('fs')
    .readFileSync('./15650.txt')
    .toString()
    .trim()
    .split(' ')
    .map((c) => parseInt(c));
  solution();
};

read();
