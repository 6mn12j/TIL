function solution() {
  let input = require('fs')
    .readFileSync('./1926example.txt')
    .toString()
    .trim()
    .split('\n');
  const [n, m] = input.shift().split(' '); //y x

  let board = input.map((arr) => arr.split(' ').map((x) => +x));
  let chk = Array.from(Array(Number(n)), () => new Array(Number(m)).fill(0));
  let cnt = 0;
  let maxWidth = 0;
  let dy = [1, 0, 0, -1];
  let dx = [0, 1, -1, 0];

  const bfs = (y, x) => {
    const queue = [];
    let width = 0;
    queue.push({ y, x });
    chk[y][x] = 1;

    while (queue.length) {
      const cur = queue.shift();
      width++;

      for (let i = 0; i < 4; i++) {
        const nextX = cur.x + dx[i];
        const nextY = cur.y + dy[i];

        if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= m) continue;
        if (chk[nextY][nextX] === 1 || board[nextY][nextX] === 0) continue;

        chk[nextY][nextX] = 1;
        queue.push({ y: nextY, x: nextX });
      }
    }
    return maxWidth < width ? width : maxWidth;
  };
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 1 && chk[i][j] === 0) {
        maxWidth = bfs(j, i);
        cnt++;
      }
    }
  }

  console.log(cnt);
  console.log(maxWidth);
}

solution();
