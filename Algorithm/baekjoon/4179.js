function solution() {
  let input = require('fs')
    .readFileSync('./4179.txt')
    .toString()
    .trim()
    .split('\n');

  const [r, c] = input.shift().split(' '); //y x
  const map = input.map((arr) => arr.split('').map((x) => x));
  let fireDist = Array.from(Array(Number(r)), () => Array(Number(c)).fill(-1));
  let jihunDist = Array.from(Array(Number(r)), () => Array(Number(c)).fill(-1));

  //벽 # , 지나갈 수 있는 공간 . , 초기위치 J, 불 F
  let dy = [0, 0, 1, -1];
  let dx = [-1, 1, 0, 0];
  let queueJ = [];
  let queueF = [];

  const bfsF = () => {
    let num = 0;
    while (num !== queueF.length) {
      const cur = queueF[num];
      for (let i = 0; i < 4; i++) {
        const nextY = cur.y + dy[i];
        const nextX = cur.x + dx[i];
        if (nextY < 0 || nextX < 0 || nextY >= r || nextX >= c) continue;
        if (map[nextY][nextX] === '#' || fireDist[nextY][nextX] >= 0) continue;
        queueF.push({ y: nextY, x: nextX });
        fireDist[nextY][nextX] = fireDist[cur.y][cur.x] + 1;
      }
      num++;
    }
  };
  const bfsJ = () => {
    let num = 0;
    while (num !== queueJ.length) {
      const cur = queueJ[num];
      for (let i = 0; i < 4; i++) {
        const nextY = cur.y + dy[i];
        const nextX = cur.x + dx[i];
        if (nextY < 0 || nextX < 0 || nextY >= r || nextX >= c) {
          console.log(jihunDist[cur.y][cur.x] + 1); //탈출
          return;
        }
        if (
          map[nextY][nextX] === '#' ||
          jihunDist[nextY][nextX] >= 0 ||
          (fireDist[nextY][nextX] !== -1 &&
            fireDist[nextY][nextX] <= jihunDist[cur.y][cur.x] + 1)
        )
          continue;

        queueJ.push({ y: nextY, x: nextX });
        jihunDist[nextY][nextX] = jihunDist[cur.y][cur.x] + 1;
      }
      num++;
    }
    console.log('IMPOSSIBLE');
  };

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (map[i][j] === 'F') {
        queueF.push({ y: i, x: j });
        fireDist[i][j] = 0;
      }
      if (map[i][j] === 'J') {
        queueJ.push({ y: i, x: j });
        jihunDist[i][j] = 0;
      }
    }
  }
  queueF.length > 0 && bfsF(queueF[0].y, queueF[0].x);
  bfsJ(queueJ[0].y, queueJ[0].x);
}

solution();
