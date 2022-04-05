/*
	상범빌딩은 각 변의 길이가 정육면체로 이루어져 있음. 가 정육면체는 지나갈 수 없거나 비어있어서 지나갈 수 있다.
	각 칸에서 인접한 6개의 칸 (동, 서, 남, 북, 상, 하) 로 이동 가능.

	building[L][C][R]

	탐색 시 d[2][4][4] 갈 수 있음.

	입력: L은 빌딩의 층 수 R가로  C세로
	출력: 탈출 할 수 있다면 Escaped in x minute(s). 출력 x는 최단 시간.
	불가능 하다면 Trapped! 출력
*/

const bfs = (currentFloor, y, x, map, maxY, maxX, maxFloor) => {
  let dy = [0, 0, 0, 0, -1, 1];
  let dx = [0, 0, 1, -1, 0, 0];
  let dz = [1, -1, 0, 0, 0, 0];
  let queue = [];
  let num = 0;

  queue.push({ floor: currentFloor, y, x, cnt: 0 });
  map[currentFloor][y][x] === 'S';

  while (queue.length !== num) {
    const cur = queue[num];

    for (let i = 0; i < 6; i++) {
      const nextFloor = cur.floor + dz[i];
      const nextY = cur.y + dy[i];
      const nextX = cur.x + dx[i];

      if (
        nextFloor < 0 ||
        nextFloor >= maxFloor ||
        nextY < 0 ||
        nextX < 0 ||
        nextY >= maxY ||
        nextX >= maxX
      )
        continue;
      if (map[nextFloor][nextY][nextX] === 'E') {
        console.log(`Escaped in ${cur.cnt + 1} minute(s).`);
        return;
      }
      if (
        map[nextFloor][nextY][nextX] === '#' ||
        map[nextFloor][nextY][nextX] === 'S'
      )
        continue;

      queue.push({
        floor: dz[i] + cur.floor,
        y: nextY,
        x: nextX,
        cnt: cur.cnt + 1,
      });
      map[nextFloor][nextY][nextX] = 'S';
    }

    num++;
  }
  console.log('Trapped!');
  return;
};

const solution = (maxFloor, row, col, map) => {
  if (row === 0 && col === 0 && maxFloor === 0) return;
  for (let i = 0; i < maxFloor; i++) {
    for (let y = 0; y < row; y++) {
      for (let x = 0; x < col; x++) {
        if (map[i][y][x] === 'S') {
          bfs(i, y, x, map, row, col, maxFloor);
          return;
        }
      }
    }
  }
};

const read = () => {
  let input = require('fs')
    .readFileSync('./6593.txt')
    .toString()
    .trim()
    .split('\n');
  while (input.length !== 0) {
    const [L, R, C] = input
      .shift()
      .split(' ')
      .map((v) => parseInt(v));
    let map = Array.from(new Array(L), () => new Array());
    for (let index = 0; index < L; index++) {
      let tempInput = input.splice(0, R);
      tempInput = tempInput.map((data) => data.split(''));
      for (let i = 0; i < R; i++) {
        map[index].push(tempInput[i]);
      }
      input.shift();
    }
    solution(L, R, C, map);
  }
};

read();
