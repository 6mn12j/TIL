/*
격자판의 크기 N,M
플레이어의 수 P
각 플레이어가 가진 성의 수
출력: 각 플레이어가 가진 성의 수 를 출력 한다.
*/

const bfs = (queue, map, N, M) => {
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  let num = 0;

  while (queue.length !== num) {
    for (let i = 0; i < 9; i++) {
      const cur = queue[i][num];

      const curCastle = map[cur.y][cur.x];
      for (let i = 0; i < 4; i++) {
        const nextY = cur.y + dy[i];
        const nextX = cur.x + dx[i];
        if (nextY < 0 || nextX < 0 || nextY >= N || nextX >= M) continue;
        if (map[nextY][nextX] !== '.') continue;
        map[nextY][nextX] = map[cur.y][cur.x];
      }
    }

    num++;
  }
};
const solution = (N, M, P, hasPlayer, map) => {
  // const isVisited = Array.from(new Array(N), () => new Array(M).fill(0));
  const answer = Array.from({ length: P }).fill(0);
  // let queue = Array.from(new Array(9), () => new Array(2));
  let queue = new Array(9).fill(0);
  for (let i = 0; i < P; i++) {
    const castle = hasPlayer[i][0];
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++)
        if (map[j][k] == castle) {
          if (queue[castle][0] === 0) queue[castle][0] = { y: j, x: k };
          else queue[castle].push({ y: j, x: k });
        }
    }
  }
  console.log(queue);

  bfs(queue, map, N, M);
};
const read = () => {
  const fs = require('fs');
  //   const input = (
  //     process.platform === 'linux'
  //       ? fs.readFileSync('/dev/stdin').toString().trim()
  //       : `3 3 2
  // 1 1
  // 1..
  // ...
  // ..2`
  //   ).split('\n');
  const input = require('fs')
    .readFileSync('./16920.txt')
    .toString()
    .trim()
    .split('\n');

  const [N, M, P] = input
    .shift()
    .split(' ')
    .map((c) => parseInt(c));
  const hasPlayer = input
    .shift()
    .split(' ')
    .map((c, index) => {
      return [index + 1, parseInt(c)];
    });
  let map = input.map((data) => data.split(''));
  solution(N, M, P, hasPlayer, map);
};

read();
