const solution = (l, cur, target) => {
  if (cur === target) {
    console.log(0);
    return;
  }
  let map = Array.from(Array(Number(l)), () => new Array(Number(l)).fill(-1));

  let queue = [];
  let dy = [2, 2, 1, 1, -1, -1, -2, -2];
  let dx = [1, -1, 2, -2, 2, -2, 1, -1];

  const bfs = () => {
    let num = 0;
    while (queue.length !== num) {
      const cur = queue[num];

      for (let i = 0; i < 8; i++) {
        const nextY = dy[i] + cur.y;
        const nextX = dx[i] + cur.x;
        if (
          nextY === target.split(' ')[0] * 1 &&
          nextX === target.split(' ')[1] * 1
        ) {
          return map[cur.y][cur.x] + 1;
        }
        if (nextY < 0 || nextX < 0 || nextY >= l || nextX >= l) continue;
        if (map[nextY][nextX] >= 0) continue;

        queue.push({ y: nextY, x: nextX });
        map[nextY][nextX] = map[cur.y][cur.x] + 1;
      }
      num++;
    }
  };

  queue.push({ y: cur.split(' ')[0] * 1, x: cur.split(' ')[1] * 1 });
  map[cur.split(' ')[0] * 1][cur.split(' ')[1] * 1] = 0;
  console.log(bfs());
};

const read = () => {
  let input = require('fs')
    .readFileSync('./7562.txt')
    .toString()
    .trim()
    .split('\n');
  const T = input.shift();
  for (let i = 0; i < T; i++) {
    const l = input[0 + i * 3];
    const cur = input[1 + i * 3];
    const target = input[2 + i * 3];

    solution(l, cur, target);
  }
};

read();
