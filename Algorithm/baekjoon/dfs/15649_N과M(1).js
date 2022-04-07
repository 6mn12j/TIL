/*
	3 1
	길이가 M인 수열을 모두 구해야함.
	함수는 n개를 고르는 함수 .
*/
const [N, M] = require('fs')
  .readFileSync('./15649.txt')
  .toString()
  .trim()
  .split(' ')
  .map((c) => parseInt(c));

let arr = [];
let isUsed = new Array(M).fill(0);

const dfs = (depth) => {
  if (depth === M) {
    console.log(...arr);
    return;
  }
  for (let i = 1; i <= N; i++) {
    if (!isUsed[i]) {
      isUsed[i] = 1;
      arr.push(i);
      dfs(depth + 1);
      isUsed[i] = 0;
      arr.pop();
    }
  }
};

const solution = (N, M) => {
  dfs(0);
};

solution();
