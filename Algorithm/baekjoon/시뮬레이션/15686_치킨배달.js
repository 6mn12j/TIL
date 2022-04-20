const homes = [];
const chickens = [];
const picked = [];
let answer = 9999999;
let map;

let N;
let M;

const getDist = () => {
  let temp = 0;
  homes.forEach((home) => {
    const tempArr = [];
    picked.forEach((chicken) => {
      tempArr.push(Math.abs(chicken.y - home.y) + Math.abs(chicken.x - home.x));
    });
    temp += Math.min(...tempArr);
  });

  return temp;
};
const dfs = (depth, start) => {
  if (depth === M) {
    answer = Math.min(getDist(), answer);
    return;
  }

  for (let i = start; i < chickens.length; i++) {
    picked.push(chickens[i]);
    dfs(depth + 1, i + 1);
    picked.pop();
  }
};

const solution = () => {
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (map[y][x] === 1) homes.push({ y, x });
      else if (map[y][x] === 2) chickens.push({ y, x });
    }
  }
  dfs(0, 0);
  console.log(answer);
};

const read = () => {
  let input = require('fs')
    .readFileSync('./15686.txt')
    .toString()
    .trim()
    .split('\n');
  [N, M] = input
    .shift()
    .split(' ')
    .map((c) => parseInt(c));
  map = input.map((line) => line.split(' ').map((c) => parseInt(c)));
  solution(N, M);
};

read();
