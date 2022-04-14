/*
	출력: 사각 지대의 최소 크기
	입력: N y,M x
	카메라 별로 다 만들어서 확인.

	map을 돌면서 해당 하는 cctv경우의 수에 해당하는 사각지대를 구한다.
	arr[]

*/

let N;
let M;
let minAnswer = 64;
let visit;
let map;
const arr = [];

const find_area = () => {
  let answer = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++)
      if (visit[i][j] === 0 && map[i][j] !== 6) answer++;
  }
  return answer;
};

const checkRange = (y, x) => {
  if (y < 0 || x < 0 || y >= N || x >= M || map[y][x] === 6) return 0;
  return 1;
};

const watchRight = (y, x, num) => {
  const nextX = x + 1;
  if (!checkRange(y, nextX)) return;
  visit[y][nextX] += num;
  watchRight(y, x + 1, num);
};

const watchLeft = (y, x, num) => {
  const nextX = x - 1;
  if (!checkRange(y, nextX)) return;
  visit[y][nextX] += num;
  watchLeft(y, x - 1, num);
};

const watchTop = (y, x, num) => {
  const nextY = y + 1;
  if (!checkRange(nextY, x)) return;
  visit[nextY][x] += num;
  watchTop(y + 1, x, num);
};

const watchBottom = (y, x, num) => {
  const nextY = y - 1;
  if (!checkRange(nextY, x)) return;
  visit[nextY][x] += num;
  watchBottom(y - 1, x, num);
};

const dfs = (depth) => {
  if (depth == arr.length) {
    const result = find_area();
    minAnswer = result < minAnswer ? result : minAnswer;
    return;
  }

  const curY = arr[depth].y;
  const curX = arr[depth].x;
  visit[curY][curX] += 1;
  if (map[curY][curX] === 1) {
    for (let i = 0; i < 4; i++) {
      if (i === 0) watchRight(curY, curX, 1);
      else if (i === 1) watchLeft(curY, curX, 1);
      else if (i === 2) watchBottom(curY, curX, 1);
      else if (i === 3) watchTop(curY, curX, 1);
      dfs(depth + 1);
      if (i === 0) watchRight(curY, curX, -1);
      else if (i === 1) watchLeft(curY, curX, -1);
      else if (i === 2) watchBottom(curY, curX, -1);
      else if (i === 3) watchTop(curY, curX, -1);
    }
  } else if (map[curY][curX] === 2) {
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        watchTop(curY, curX, 1);
        watchBottom(curY, curX, 1);
      } else if (i === 1) {
        watchRight(curY, curX, 1);
        watchLeft(curY, curX, 1);
      }
      dfs(depth + 1);
      if (i === 0) {
        watchTop(curY, curX, -1);
        watchBottom(curY, curX, -1);
      } else if (i === 1) {
        watchRight(curY, curX, -1);
        watchLeft(curY, curX, -1);
      }
    }
  } else if (map[curY][curX] === 3) {
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        watchTop(curY, curX, 1);
        watchRight(curY, curX, 1);
      } else if (i === 1) {
        watchRight(curY, curX, 1);
        watchBottom(curY, curX, 1);
      } else if (i === 2) {
        watchBottom(curY, curX, 1);
        watchLeft(curY, curX, 1);
      } else if (i === 3) {
        watchLeft(curY, curX, 1);
        watchTop(curY, curX, 1);
      }
      dfs(depth + 1);
      if (i === 0) {
        watchTop(curY, curX, -1);
        watchRight(curY, curX, -1);
      } else if (i === 1) {
        watchRight(curY, curX, -1);
        watchBottom(curY, curX, -1);
      } else if (i === 2) {
        watchBottom(curY, curX, -1);
        watchLeft(curY, curX, -1);
      } else if (i === 3) {
        watchLeft(curY, curX, -1);
        watchTop(curY, curX, -1);
      }
    }
  } else if (map[curY][curX] === 4) {
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        watchTop(curY, curX, 1);
        watchLeft(curY, curX, 1);
        watchRight(curY, curX, 1);
      } else if (i === 1) {
        watchLeft(curY, curX, 1);
        watchRight(curY, curX, 1);
        watchBottom(curY, curX, 1);
      } else if (i === 2) {
        watchRight(curY, curX, 1);
        watchBottom(curY, curX, 1);
        watchTop(curY, curX, 1);
      } else if (i === 3) {
        watchBottom(curY, curX, 1);
        watchTop(curY, curX, 1);
        watchLeft(curY, curX, 1);
      }
      dfs(depth + 1);
      if (i === 0) {
        watchTop(curY, curX, -1);
        watchLeft(curY, curX, -1);
        watchRight(curY, curX, -1);
      } else if (i === 1) {
        watchLeft(curY, curX, -1);
        watchRight(curY, curX, -1);
        watchBottom(curY, curX, -1);
      } else if (i === 2) {
        watchRight(curY, curX, -1);
        watchBottom(curY, curX, -1);
        watchTop(curY, curX, -1);
      } else if (i === 3) {
        watchBottom(curY, curX, -1);
        watchTop(curY, curX, -1);
        watchLeft(curY, curX, -1);
      }
    }
  } else if (map[curY][curX] === 5) {
    watchBottom(curY, curX, 1);
    watchTop(curY, curX, 1);
    watchLeft(curY, curX, 1);
    watchRight(curY, curX, 1);
    dfs(depth + 1);
    watchBottom(curY, curX, -1);
    watchTop(curY, curX, -1);
    watchLeft(curY, curX, -1);
    watchRight(curY, curX, -1);
  }
};

const solution = (N, M, map) => {
  visit = Array.from(Array(N), () => new Array(M).fill(0));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] >= 1 && map[i][j] <= 5) arr.push({ y: i, x: j });
    }
  }
  dfs(0);
  console.log(minAnswer);
};

const read = () => {
  let input = require('fs')
    .readFileSync('./15683.txt')
    .toString()
    .trim()
    .split('\n');
  [N, M] = input
    .shift()
    .split(' ')
    .map((c) => parseInt(c));
  map = input.map((line) => line.split(' ').map((c) => parseInt(c)));
  solution(N, M, map);
};

read();
