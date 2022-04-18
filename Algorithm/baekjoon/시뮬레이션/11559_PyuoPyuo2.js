/*
	while(1)
	{
		board 를 한번 돌면서 확인
		{
			1. 한 색을 탐색한다.
			2. 인접한 색을 탐색하면서 큐에 넣는다. (bfs) -> 들어간 색에서부터 인접한 색을 다 탐색 한다.
				2 - 1. 큐를 끝까지 다 탐색 했을때 해당 큐의 길이가 4 이상이면 터트린다. (리턴값)
				2 - 2. 큐를 끝까지 다 탐색 했을때 해당 큐의 길이가 4 보다 적으면 리턴 0.
		}
		리턴 값이 있으면 연쇄 ++;
		리턴 값이 0 이면 연쇄를 출력하고 종료.
	}

*/

let board;
let visit;
let chain = 0;

const dy = [0, 0, 1, -1];
const dx = [1, -1, 0, 0];

const handleBomb = (queue) => {
  queue.forEach((cur) => (board[cur.y][cur.x] = '.'));
};

const handleBoard = () => {
  for (let x = 0; x < 6; x++) {
    let target = 11;
    let bottom = 11;
    while (target >= 0 && bottom >= 0) {
      if (board[target][x] !== '.' && board[bottom][x] === '.') {
        board[bottom][x] = board[target][x];
        board[target][x] = '.';
        bottom--;
        target--;
      } else if (board[target][x] !== '.' && board[bottom][x] !== '.') {
        bottom--;
        target--;
      } else if (board[target][x] === '.' && board[bottom][x] !== '.') {
        bottom--;
      } else if (board[target][x] === '.' && board[bottom][x] === '.') {
        target--;
      }
    }
  }
};

const bfs = (y, x) => {
  let queue = [];
  let num = 0;

  visit[y][x] = chain;
  queue.push({ y, x });
  while (queue.length !== num) {
    const cur = queue[num];
    for (let i = 0; i < 4; i++) {
      const nextY = dy[i] + cur.y;
      const nextX = dx[i] + cur.x;
      if (nextY < 0 || nextX < 0 || nextY >= 12 || nextX >= 6) continue;
      if (
        visit[nextY][nextX] === chain ||
        board[nextY][nextX] !== board[cur.y][cur.x]
      )
        continue;
      queue.push({ y: nextY, x: nextX });
      visit[nextY][nextX] = chain;
    }
    num++;
  }
  if (queue.length >= 4) {
    handleBomb(queue);
    handleBoard();
    return queue.length;
  } else return 0;
};

const solution = () => {
  visit = Array.from(new Array(12), () => new Array(6).fill(-1));

  while (1) {
    let flag = 0;
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 6; j++) {
        if (board[i][j] !== '.' && visit[i][j] !== chain) {
          flag = Math.max(flag, bfs(i, j));
        }
      }
    }
    if (!flag) {
      console.log(chain);
      return;
    } else chain++;
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
