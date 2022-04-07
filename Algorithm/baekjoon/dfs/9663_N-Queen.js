/*
	dfs() -> y좌표를 확인
	dfs 내부에서는 x좌표를 확인

*/

let N = require('fs').readFileSync('./9663.txt').toString().trim();
let answer = 0;
let v1 = new Array(parseInt(N)).fill(0); //x
let v2 = new Array(2 * parseInt(N) - 1).fill(0); //x+y
let v3 = new Array(2 * parseInt(N) - 1).fill(0); //x-y

const dfs = (depth) => {
  N = parseInt(N);
  if (depth === N) {
    answer++;
    return;
  }
  for (let x = 0; x < N; x++) {
    if (!v1[x] && !v2[x + depth] && !v3[x - depth]) {
      v1[x] = 1;
      v2[x + depth] = 1;
      v3[x - depth] = 1;
      dfs(depth + 1);
      v1[x] = 0;
      v2[x + depth] = 0;
      v3[x - depth] = 0;
    }
  }
};
dfs(0);
console.log(answer);
