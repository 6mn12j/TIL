function solution(map, n) {
  let visit = Array.from(Array(Number(n)), () => new Array(Number(n)).fill(-1));
  let area = [0, 0];
  let dy = [0, 0, 1, -1];
  let dx = [1, -1, 0, 0];
  const bfs2 = (y, x) => {
    let num = 0;
    let queue = [];

    queue.push({ y, x });
    visit[y][x] = 1;
    while (queue.length !== num) {
      const cur = queue[num];
      for (let i = 0; i < 4; i++) {
        const nextY = dy[i] + cur.y;
        const nextX = dx[i] + cur.x;
        if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= n) continue;
        if (
          (map[cur.y][cur.x] === 'R' && map[nextY][nextX] === 'B') ||
          (map[cur.y][cur.x] === 'G' && map[nextY][nextX] === 'B') ||
          (map[cur.y][cur.x] === 'B' && map[nextY][nextX] !== 'B') ||
          visit[nextY][nextX] !== -1
        )
          continue;
        queue.push({ y: nextY, x: nextX });
        visit[nextY][nextX] = 1;
        map[nextY][nextX] = map[cur.y][cur.x];
      }
      num++;
    }
  };
  const bfs = (y, x) => {
    let num = 0;
    let queue = [];

    queue.push({ y, x });
    visit[y][x] = 1;
    while (queue.length !== num) {
      const cur = queue[num];
      for (let i = 0; i < 4; i++) {
        const nextY = dy[i] + cur.y;
        const nextX = dx[i] + cur.x;
        if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= n) continue;
        if (
          map[nextY][nextX] !== map[cur.y][cur.x] ||
          visit[nextY][nextX] !== -1
        )
          continue;
        queue.push({ y: nextY, x: nextX });
        visit[nextY][nextX] = 1;
      }
      num++;
    }
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visit[i][j] === -1) {
        bfs(i, j);
        area[0]++;
      }
    }
  }
  visit = Array.from(Array(Number(n)), () => new Array(Number(n)).fill(-1));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visit[i][j] === -1) {
        bfs2(i, j);
        area[1]++;
      }
    }
  }
  console.log(`${area[0]} ${area[1]}`);
}

function read() {
  let input = require('fs')
    .readFileSync('./10026.txt')
    .toString()
    .trim()
    .split('\n');
  const n = input.shift();
  let map = input.map((arr) => arr.split('').map((rgb) => rgb));
  solution(map, n);
}

read();
