const map = Array.from(Array(502), () => Array(502).fill(null));
const chk = Array.from(Array(502), () => Array(502).fill(null));
let dy = [1, 0, 0, -1];
let dx = [0, 1, -1, 0];
const n = 7; //x
const m = 10; //y

function bfs() {
  const queue = [];
  queue.push({ x: 0, y: 0 });
  chk[0][0] = 1;
  while (queue.length) {
    const cur = queue.shift();
    for (let i = 0; i < 4; i++) {
      let nextX = cur.x + dx[i];
      let nextY = cur.y + dy[i];
      if (nextX < 0 || nextY < 0 || nextX <= n || nextY <= m) continue;
      if (chk[nextX][nextY] && map[nextX][nextY] !== 1) continue;
      chk[nextX][nextY] = 1;
      queue.push({ x: nextX, y: nextY });
    }
  }
}
