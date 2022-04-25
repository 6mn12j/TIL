let map;
let tmepMap;
let answerMax = 0;
let N, M; //세로 N 가로 M

const dy = [0, 0, 1, -1];
const dx = [1, -1, 0, 0];

let visit;

const spread = (y, x) => {
  let num = 0;
  let queue = [];

  queue.push({ y, x, width: 1 });
  while (queue.length !== num) {
    const cur = queue[num];
    for (let i = 0; i < 4; i++) {
      const nextY = cur.y + dy[i];
      const nextX = cur.x + dx[i];
      if (nextY < 0 || nextX < 0 || nextY >= N || nextX >= M) continue;
      if (tmepMap[nextY][nextX] !== 0 || visit[nextY][nextX] !== 0) continue;
      queue.push({ y: nextY, x: nextX, width: cur.width + 1 });
      tmepMap[nextY][nextX] = 2;
      visit[nextY][nextX] = 1;
    }
    num++;
  }
  return;
};

const dfs = (index, depth) => {
  if (depth === 3) {
    //안전영역 구하기
    visit = Array.from(Array(N), () => new Array(M).fill(0));
    tmepMap = Array.from(Array(N), () => new Array(M).fill(0));
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) tmepMap[i][j] = map[i][j];
    }
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (tmepMap[i][j] === 2 && !visit[i][j]) {
          visit[i][j] = 1;
          spread(i, j);
        }
      }
    }

    let safeCnt = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (tmepMap[i][j] === 0) safeCnt++;
      }
    }
    answerMax = Math.max(answerMax, safeCnt);

    return;
  }
  if (index >= N * M) return;
  const y = Math.floor(index / M);
  const x = Math.floor(index % M);
  if (map[y][x] === 0) {
    map[y][x] = 1;
    dfs(index + 1, depth + 1);
    map[y][x] = 0;
  }
  dfs(index + 1, depth);
};

const solution = () => {
  dfs(0, 0);
  console.log(answerMax);
};
const read = () => {
  let input = require('fs')
    .readFileSync('./1450.txt')
    .toString()
    .trim()
    .split('\n');

  [N, M] = input
    .shift()
    .split(' ')
    .map((c) => parseInt(c));
  map = input.map((line) => line.split(' ').map((c) => parseInt(c)));
  solution();
};

read();
