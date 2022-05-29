let r, c;
let board;
let isVisited;
let maxAnswer = 0;

const dy = [0, 0, 1, -1];
const dx = [1, -1, 0, 0];

const dfs = (depth, y, x, alphaArr) => {
  for (let i = 0; i < 4; i++) {
    const nextY = y + dy[i];
    const nextX = x + dx[i];
    if (nextY < 0 || nextX < 0 || nextY >= r || nextX >= c) continue;
    if (isVisited[nextY][nextX] === 1 || alphaArr.includes(board[nextY][nextX]))
      continue;
    alphaArr.push(board[nextY][nextX]);
    isVisited[nextY][nextX] = 1;
    dfs(depth + 1, nextY, nextX, alphaArr);
    isVisited[nextY][nextX] = 0;
    alphaArr.pop();
  }
  maxAnswer = Math.max(depth, maxAnswer);
};
const solutoin = (r, c, board) => {
  isVisited = Array.from(Array(r), () => new Array(c).fill(0));
  const alphaArr = [];
  isVisited[0][0] = 1;
  alphaArr.push(board[0][0]);
  dfs(1, 0, 0, alphaArr);
  console.log(maxAnswer);
};

const read = () => {
  let input = require("fs")
    .readFileSync("./1987.txt")
    .toString()
    .trim()
    .split("\n");
  [r, c] = input
    .shift()
    .split(" ")
    .map((c) => parseInt(c));
  board = input.map((line) => line.split(""));
  solutoin(r, c, board);
};

read();
