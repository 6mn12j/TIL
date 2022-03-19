function solution() {
  let input = require('fs')
    .readFileSync('./7576.txt')
    .toString()
    .trim()
    .split('\n');
  const [m, n] = input.shift().split(' '); //x y
  const box = input.map((arr) => arr.split(' ').map((x) => +x));
  let chk = Array.from(Array(Number(n)), () => new Array(Number(m)).fill(-1));
  const dy = [0, 0, 1, -1];
  const dx = [1, -1, 0, 0];
  const queue = [];
  let day = 0;
  //익은 토마토 1, 익지 않은 토마토 0, 토마토가 들어있지 않음 -1.
  const bfs = () => {
    let num = 0;
    while (num !== queue.length) {
      const cur = queue[num];
      box[cur.y][cur.x] = 1;
      for (let i = 0; i < 4; i++) {
        const nextY = cur.y + dy[i];
        const nextX = cur.x + dx[i];
        if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= m) continue;
        if (box[nextY][nextX] !== 0 || chk[nextY][nextX] > 0) continue;
        queue.push({ y: nextY, x: nextX });
        chk[nextY][nextX] = chk[cur.y][cur.x] + 1;
      }
      num++;
    }
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (box[i][j] === 1) {
        queue.push({ y: i, x: j });
        chk[i][j] = 1;
      }
    }
  }
  bfs();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (box[i][j] === 0) return console.log(-1);
      if (day < chk[i][j]) day = chk[i][j];
    }
  }

  console.log(day - 1);
}

solution();
