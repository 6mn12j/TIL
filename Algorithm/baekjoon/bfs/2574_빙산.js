/*
	입력 : N, M, map
	출력: 빙산이 2개로 분리되는 최초의 시간. 다 녹을때 까지 분리 되지 않으면 0 출력.

	빙산의 높이는 동서남북 네방향으로 붙어있는 0이 저장된 칸의 개수만큼 줄어든다.
	각칸의 높이는 0보다 더 줄어들지 않는다.
	녹이고 -> 확인


*/

const bfs = (map, isVisited, time, y, x, n, m) => {
  let dy = [0, 0, 1, -1];
  let dx = [1, -1, 0, 0];
  let queue = [];
  let num = 0;
  queue.push({ y, x, time, overlap: 0 });
  while (queue.length !== num) {
    const cur = queue[num];
    for (let i = 0; i < 4; i++) {
      const nextY = dy[i] + cur.y;
      const nextX = dx[i] + cur.x;
      if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= m) continue;
      if (map[nextY][nextX] <= 0 && map[nextY][nextX] !== -time) cur.overlap++;
      if (isVisited[nextY][nextX] > 0) continue;
      if (map[nextY][nextX] <= 0) continue;
      isVisited[nextY][nextX] = 1;
      queue.push({ y: nextY, x: nextX, time, overlap: 0 });
    }
    map[cur.y][cur.x] =
      map[cur.y][cur.x] - cur.overlap <= 0
        ? -time
        : map[cur.y][cur.x] - cur.overlap;
    num++;
  }
  return 1;
};

const solution = (n, m, map) => {
  let time = 0;

  while (1) {
    let isVisited = Array.from(Array(n), () => new Array(m).fill(0));
    let cnt = 0;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        if (isVisited[y][x] === 0 && map[y][x] > 0) {
          isVisited[y][x] = 1;
          cnt += bfs(map, isVisited, time + 1, y, x, n, m);
        }
      }
    }
    if (time === 0 && cnt == 2) {
      console.log(0);
      return;
    }
    if (cnt === 0) {
      console.log(0);
      return;
    }
    if (cnt > 1) {
      console.log(time);
      return;
    }
    time++;
  }
};

const read = () => {
  let input = require('fs')
    .readFileSync('./2574.txt')
    .toString()
    .trim()
    .split('\n');
  const [n, m] = input.shift().split(' ');
  let map = input.map((line) => line.split(' ').map((c) => parseInt(c)));
  solution(parseInt(n), parseInt(m), map);
};

read();
