function solution() {
  let input = require('fs')
    .readFileSync('dev/stdin')
    .toString()
    .trim()
    .split('\n');
  const [n, m] = input.shift().split(' '); //y x
  let map = input.map((arr) => arr.split('').map((x) => +x));
  let dist = Array.from(Array(Number(n)), () => new Array(Number(m)).fill(-1));
  const dy = [1, 0, 0, -1];
  const dx = [0, 1, -1, 0];
  const bfs = () => {
    const queue = [];
    queue.push({ y: 0, x: 0 });
    dist[0][0] = 0;
    while (queue.length) {
      const cur = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nextY = cur.y + dy[i];
        const nextX = cur.x + dx[i];
        if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= m) continue;
        if (dist[nextY][nextX] > 0 || map[nextY][nextX] !== 1) continue;
        queue.push({ y: nextY, x: nextX });
        dist[nextY][nextX] = dist[cur.y][cur.x] + 1;
      }
    }
  };

  bfs();
  console.log(dist[n - 1][m - 1] + 1);
}
solution();
