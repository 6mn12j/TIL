let map;
let N;
let M;

const getCombinations = function (arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((value) => [value]);

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    results.push(...attached);
  });

  return results;
};

const solution = () => {
  let BBQ = [];
  let homes = [];
  let answer = [];
  let BBQCombinations;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (map[y][x] === 2) BBQ.push({ y, x });
      if (map[y][x] === 1) homes.push({ y, x });
    }
  }

  BBQCombinations = getCombinations(BBQ, M);
  for (let i = 0; i < BBQCombinations.length; i++) {
    answer[i] = 0;
    for (let j = 0; j < homes.length; j++) {
      let temp = [];
      BBQCombinations[i].forEach((chicken) => {
        const home = homes[j];
        temp.push(Math.abs(home.y - chicken.y) + Math.abs(home.x - chicken.x));
      });
      answer[i] += Math.min(...temp);
    }
  }

  console.log(Math.min(...answer));
};

const read = () => {
  let input = require('fs')
    .readFileSync('dev/stdin')
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
