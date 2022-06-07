/*	
	치즈의 가장자리면 녹는다 -> 가장자리는 
	board의 0인부분이면 들어가서 상하좌우로 0을 덮어 씌운다.
	처음에 1인 칸의 갯수를 저장해놓고 prev 인수를 가지고 가야할듯.
	치즈 조각들이 다 녹을때 까지 반복한다.
	다녹을때의 시간과 prev를 return.

	bfs 를 돌면서
	board tempBoard가 있음.
	board는 치즈가 실제로 녹는 board
	tempBoard에는 -1 로 가장자리도 체크를 해준다.

	bfs를 돌때 0 이면 들어가서 녹인다.
	queue에 들어갈때는 tempBoard가 -1 인 이후의 값들은 들어가면 안된다.
*/

const dy = [0, 0, 1, -1];
const dx = [1, -1, 0, 0];

let board;
let boardY, boardX;

const bfs = (board, visit) => {
  let num = 0;
  let queue = [];
  queue.push({ y: 0, x: 0 });
  visit[0][0] = 1;
  while (num !== queue.length) {
    const cur = queue[num];
    for (let i = 0; i < 4; i++) {
      const nextY = cur.y + dy[i];
      const nextX = cur.x + dx[i];
      if (nextY < 0 || nextX < 0 || nextY >= boardY || nextX >= boardX)
        continue;
      if (visit[nextY][nextX] === 1) continue;
      if (board[nextY][nextX] === 1) {
        visit[nextY][nextX] = -1;
        board[nextY][nextX] = 0;
        continue;
      }
      if (visit[nextY][nextX] === -1 || board[nextY][nextX] === 1) continue;

      queue.push({ y: nextY, x: nextX });
      visit[nextY][nextX] = 1;
    }
    num++;
  }
  return board;
};

const solution = (prevCheese) => {
  let time = 0;
  let cheese = prevCheese;
  while (cheese > 0) {
    let visit = Array.from(new Array(boardY), () => new Array(boardX).fill(0));
    prevCheese = cheese;
    board = bfs(board, visit);
    cheese = 0;
    board.forEach((line) =>
      line.forEach((num) => {
        if (num === 1) cheese++;
      })
    );
    time++;
  }

  console.log(time, prevCheese);
};

const read = () => {
  let input = require("fs")
    .readFileSync("./2636.txt")
    .toString()
    .trim()
    .split("\n");

  [boardY, boardX] = input
    .shift()
    .split(" ")
    .map((c) => parseInt(c));
  let prevCheese = 0;
  board = input.map((line) =>
    line.split(" ").map((c) => {
      c = parseInt(c);
      if (c === 1) prevCheese++;
      return c;
    })
  );
  solution(prevCheese);
};

read();
