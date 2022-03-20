function solution() {
  let input = require('fs')
    .readFileSync('dev/stdin')
    .toString()
    .trim()
    .split('\n');

  const n = input.shift();
  const map = input.map((arr) => arr.split('').map((x) => +x));
  let visit = Array.from(Array(Number(n)), () => new Array(Number(n)).fill(-1));

  const dy = [0, 0, -1, 1];
  const dx = [1, -1, 0, 0];

  let queue = [];
  let cnt = 0;
  let arr = new Array();

  const bfs = () => {
    while (queue.length) {
      const cur = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nextY = dy[i] + cur.y;
        const nextX = dx[i] + cur.x;

        if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= n) continue;
        if (visit[nextY][nextX] >= 0 || map[nextY][nextX] === 0) continue;

        queue.push({ y: nextY, x: nextX });
        arr[cnt - 1]++;
        visit[nextY][nextX] = visit[cur.y][cur.x];
      }
    }
  };
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (map[i][j] === 1 && visit[i][j] < 0) {
        queue.push({ y: i, x: j });
        cnt++;
        visit[i][j] = cnt;
        arr[cnt - 1] = 1;
        bfs(i, j);
      }
    }
  }
  arr.sort((a, b) => a - b);
  console.log(cnt);
  arr.map((data) => console.log(data));
}
solution();
