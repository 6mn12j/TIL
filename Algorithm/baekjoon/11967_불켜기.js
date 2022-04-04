const bfs = (N, isVisited, arr) => {
  let num = 0;
  let maxRoom = 1;
  let queue = [];
  let dy = [0, 0, 1, -1];
  let dx = [1, -1, 0, 0];
  let isMove = Array.from(Array(N + 1), () => new Array(N + 1).fill(0));
  isVisited[1][1] = 2;
  isMove[1][1] === true;
  queue.push([1, 1]);

  while (queue.length !== num) {
    const [curY, curX] = queue[num];
    for (let [rightY, rightX] of arr[curY][curX]) {
      if (isVisited[rightY][rightX] === 0) {
        maxRoom++;
        isVisited[rightY][rightX] = 1;
        if (isMove[rightY][rightX] === true) {
          queue.push([rightY, rightX]);
          isVisited[rightY][rightX] = 2;
        }
      }
    }

    for (let i = 0; i < 4; i++) {
      const nextY = curY + dy[i];
      const nextX = curX + dx[i];

      if (nextY < 1 || nextX < 1 || nextY > N || nextX > N) continue;
      isMove[nextY][nextX] = true;

      if (isVisited[nextY][nextX] === 1) {
        //불을 킨 방으로만 이동한다.
        queue.push([nextY, nextX]);
        isVisited[nextY][nextX] = 2;
      }
    }
    num++;
  }

  return maxRoom;
};

const solution = (N, M, arr) => {
  let answer = 0;
  let isVisited = Array.from(Array(N + 1), () => new Array(N + 1).fill(0));
  answer = bfs(N, isVisited, arr);

  console.log(answer);
};

const read = () => {
  const input = (() => {
    let line = 0;
    return () => stdin[line++];
  })();
  let stdin = require('fs')
    .readFileSync('./11967.txt')
    .toString()
    .trim()
    .split('\n');
  const [N, M] = input().split(' ').map(Number);
  const buttonHasRooms = Array.from(new Array(N + 1), () => new Array(N + 1));
  console.log(buttonHasRooms);
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      buttonHasRooms[i][j] = [];
    }
  }
  for (let i = 0; i < M; i++) {
    const [x, y, a, b] = input().split(' ').map(Number);
    buttonHasRooms[x][y].push([a, b]);
  }
  console.log(...buttonHasRooms);
  solution(parseInt(N), parseInt(M), buttonHasRooms);
};

read();
