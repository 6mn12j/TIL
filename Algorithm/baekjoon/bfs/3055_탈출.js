/*
	출력: 고슴도치가 비버의 굴로 이동할 수 있는 가장 빠른 시간.

  d * *
  * * *
  s s s
*/
let minTime = 99999999999;
let floods = [];
let board;
let isVisited;
let r, c;

const dy = [0, 0, 1, -1];
const dx = [1, -1, 0, 0];

const handleFlood = () => {
  const newFloods = [];
  let num = floods.length;
  while (--num >= 0) {
    const flood = floods[num];
    floods.pop();
    newFloods.push(flood);
    for (let i = 0; i < 4; i++) {
      const nextY = flood.y + dy[i];
      const nextX = flood.x + dx[i];
      if (nextY < 0 || nextX < 0 || nextY >= r || nextX >= c) continue;
      if (board[nextY][nextX] === ".") {
        board[nextY][nextX] = "*";
        newFloods.push({ y: nextY, x: nextX });
      }
    }
  }

  return newFloods;
};

const bfs = (y, x) => {
  let queue = [];
  let num = 0;
  queue.push({ y, x, time: 0 });
  isVisited[y][x] = 1;
  while (queue.length !== num) {
    const cur = queue[num];
    for (let i = 0; i < 4; i++) {
      const nextY = cur.y + dy[i];
      const nextX = cur.x + dx[i];
      if (nextY < 0 || nextX < 0 || nextY >= r || nextX >= c) continue;
      if (board[cur.y][cur.x] !== "*" && board[nextY][nextX] === "D") {
        if (minTime > cur.time + 1) minTime = cur.time + 1;
        break;
      }
      if (board[nextY][nextX] !== "." || isVisited[nextY][nextX] === 1)
        continue;

      queue.push({ y: nextY, x: nextX, time: cur.time + 1 });
      isVisited[nextY][nextX] = 1;
    }
    num++;

    if (queue[num]) if (cur.time !== queue[num].time) floods = handleFlood();
  }
  return;
};

const solution = (r, c, board) => {
  isVisited = Array.from(Array(r), () => new Array(c).fill(0));
  for (let y = 0; y < r; y++) {
    for (let x = 0; x < c; x++) {
      if (board[y][x] === "S") {
        floods.unshift({ y, x });
      } else if (board[y][x] === "*") floods.push({ y, x });
    }
  }
  const start = floods.shift();
  bfs(start.y, start.x, 0);
  console.log(minTime === 99999999999 ? "KAKTUS" : minTime);
};

const read = () => {
  let input =
    process.platform === "linux"
      ? require("fs").readFileSync("/dev/stdin")
      : require("fs").readFileSync("./3055.txt");
  input = input.toString().trim().split("\n");
  [r, c] = input
    .shift()
    .split(" ")
    .map((c) => parseInt(c));
  board = input.map((line) => line.split(""));

  solution(r, c, board);
};

read();
