function solution(map, n, m) {
  let queue = [];
  let visit = Array.from(Array(Number(n)), () => new Array(Number(m)).fill(-1));
  let warm = new Array();
  const bfs = (y, x) => {
    let dy = [0, 0, 1, -1];
    let dx = [1, -1, 0, 0];
    let num = 0;
    visit[y][x] = 1;
    while (queue.length !== num) {
      const cur = queue[num];
      for (let i = 0; i < 4; i++) {
        const nextY = cur.y + dy[i];
        const nextX = cur.x + dx[i];
        if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= m) continue;
        if (visit[nextY][nextX] !== -1 || map[nextY][nextX] === 0) continue;
        queue.push({ y: nextY, x: nextX });
        visit[nextY][nextX] = 1;
      }
      num++;
    }
  };
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (visit[i][j] === -1 && map[i][j] === 1) {
        warm[warm.length] = 1;
        queue.push({ y: i, x: j });
        bfs(i, j);
      }
    }
  }
  console.log(warm.length);
}

function read() {
  let input = require('fs')
    .readFileSync('./1012.txt')
    .toString()
    .trim()
    .split('\n');
  let cnt = input.shift();
  let map;
  while (cnt--) {
    const [m, n, num] = input.shift().split(' ');
    map = Array.from(Array(Number(n)), () => new Array(Number(m)).fill(0));
    for (let i = 0; i < num; i++) {
      map[input[i].split(' ')[1] * 1][input[i].split(' ')[0] * 1] = 1;
    }
    solution(map, n, m);
    input.splice(0, Number(num));
  }
}

read();
