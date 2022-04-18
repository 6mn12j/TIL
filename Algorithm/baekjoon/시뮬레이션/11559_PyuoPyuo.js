let board;
let visit;
let chain = 1;

const dy = [-1, 0, 0, 1];
const dx = [0, 1, -1, 0];

const handleBomb = (queue) => {
  queue.forEach((cur) => {
    board[cur.y][cur.x] = '.';
  });

  return 1;
};

const handleChange = () => {
  let y = 10;
  for (let x = 0; x < 6; x++) {
    y = 10;
    while (y >= 0) {
      if (board[y + 1][x] === '.' && board[y][x] !== '.') {
        board[y + 1][x] = board[y][x];
        board[y][x] = '.';
      }
      y--;
      if (y === -1) {
        for (let i = 11; i >= 1; i--) {
          if (board[i][x] == '.' && board[i - 1][x] != '.') {
            y = 10;
          }
        }
      }
    }
  }
};
const bfs = (y, x) => {
  let queue = [];
  let num = 0;
  queue.push({ y, x });
  visit[y][x] = chain;
  while (queue.length !== num) {
    const cur = queue[num];

    for (let i = 0; i < 4; i++) {
      const nextY = cur.y + dy[i];
      const nextX = cur.x + dx[i];
      if (nextY < 0 || nextX < 0 || nextY >= 12 || nextX >= 6) continue;
      if (
        board[nextY][nextX] !== board[cur.y][cur.x] ||
        visit[nextY][nextX] == chain
      )
        continue;
      visit[nextY][nextX] = chain;
      queue.push({ y: nextY, x: nextX });
    }
    num++;
  }

  if (queue.length >= 4) {
    handleBomb(queue);
    handleChange();
    return chain;
  }
  return 0;
};

const solution = () => {
  let answer = 0;
  visit = Array.from(Array(12), () => new Array(6).fill(-1));

  while (1) {
    let flag = 0;
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 6; j++) {
        if (visit[i][j] != chain && board[i][j] !== '.') {
          flag = Math.max(flag, bfs(i, j));
        }
      }
    }
    if (flag > 0) chain++;
    else {
      console.log(chain - 1);
      return;
    }
  }
};

const read = () => {
  const input = require('fs')
    .readFileSync('./11559.txt')
    .toString()
    .trim()
    .split('\n');
  board = input.map((line) => line.split(''));
  solution();
};

read();
