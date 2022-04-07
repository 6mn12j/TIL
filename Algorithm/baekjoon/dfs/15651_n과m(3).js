/*
	3 1
	길이가 M인 수열을 모두 구해야함.
	함수는 n개를 고르는 함수 .
	출력할때 증가하는 순서만. 같은 수를 여러번 골라도 된다.
*/
const [N, M] = require('fs')
  .readFileSync('./15650.txt')
  .toString()
  .trim()
  .split(' ')
  .map((c) => parseInt(c));

let arr = [];
let result = [];
const dfs = (depth) => {
  if (depth === M) {
    result += `${arr.join(' ')}\n`;

    return;
  }
  for (let i = 1; i <= N; i++) {
    arr.push(i);
    dfs(depth + 1);
    arr.pop();
  }
};

dfs(0);
console.log(result.trim());
