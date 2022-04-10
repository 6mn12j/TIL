let input = require('fs')
  .readFileSync('./1992.txt')
  .toString()
  .trim()
  .split('\n');
const N = input.shift();
const map = input.map((line) => line.split('').map((c) => parseInt(c)));

let answer = '';

const recursive = (n, y, x) => {
  for (let i = y; i < y + n; i++) {
    for (let j = x; j < x + n; j++) {
      if (map[y][x] !== map[i][j]) {
        answer += '(';
        recursive(n / 2, y, x);
        recursive(n / 2, y, x + n / 2);
        recursive(n / 2, y + n / 2, x);
        recursive(n / 2, y + n / 2, x + n / 2);
        answer += ')';
        return;
      }
    }
  }
  answer += map[y][x];
  return;
};
const solution = (N) => {
  recursive(N, 0, 0);
  console.log(answer);
};

solution(N, map);
