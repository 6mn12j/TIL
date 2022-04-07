/*
	3 1
	길이가 M인 수열을 모두 구해야함.
	함수는 n개를 고르는 함수 .
	출력할때 증가하는 순서만.
*/
const [N, M] = require('fs')
  .readFileSync('./15650.txt')
  .toString()
  .trim()
  .split(' ')
  .map((c) => parseInt(c));

let arr = [];
let isUsed = new Array(M).fill(0);

const dfs = (depth, prev) => {
  if (depth === M) {
    console.log(...arr);
  }
  for (let i = prev; i <= N; i++) {
    if (!isUsed[i]) {
      isUsed[i] = 1;
      arr.push(i);
      dfs(depth + 1, i);
      isUsed[i] = 0;
      arr.pop();
    }
  }
};

dfs(0, 1);
