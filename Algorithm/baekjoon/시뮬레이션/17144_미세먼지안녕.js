let r, c, t;

const dy = [0, 0, 1, -1];
const dx = [1, -1, 0, 0];

const solution = (board) => {
  const air = [];
  for (let time = 0; time < t; time++) {
    let tempBoard = Array.from(new Array(r), () => new Array(c).fill(0));
    for (let y = 0; y < r; y++) {
      for (let x = 0; x < c; x++) {
        if (board[y][x] === -1) {
          tempBoard[y][x] = -1;
          if (time === 0) air.push([y, x]);
        } else if (board[y][x] > 0) {
          let cnt = 0;
          let curentDust = board[y][x];
          const spreadDust = Math.floor(curentDust / 5);

          for (let i = 0; i < 4; i++) {
            const nextY = y + dy[i];
            const nextX = x + dx[i];
            if (nextY < 0 || nextX < 0 || nextY >= r || nextX >= c) continue;
            if (board[nextY][nextX] >= 0) {
              cnt++;
              tempBoard[nextY][nextX] += spreadDust;
            }
          }

          if (cnt > 0) {
            tempBoard[y][x] += curentDust - spreadDust * cnt;
          }
        }
      }
    }

    let [airY, airX] = air[0]; //0,2
    for (let y = airY; y >= 1; y--) tempBoard[y][0] = tempBoard[y - 1][0];
    for (let x = 0; x < c - 1; x++) tempBoard[0][x] = tempBoard[0][x + 1];
    for (let y = 0; y <= airY - 1; y++)
      tempBoard[y][c - 1] = tempBoard[y + 1][c - 1];
    for (let x = c - 1; x >= 1; x--)
      tempBoard[airY][x] = tempBoard[airY][x - 1];
    tempBoard[airY][1] = 0;
    tempBoard[airY][airX] = -1;

    [airY, airX] = air[1];

    for (let y = airY; y < r - 1; y++) tempBoard[y][0] = tempBoard[y + 1][0];
    for (let x = 0; x < c - 1; x++)
      tempBoard[r - 1][x] = tempBoard[r - 1][x + 1];
    for (let y = r - 1; y >= airY + 1; y--)
      tempBoard[y][c - 1] = tempBoard[y - 1][c - 1];
    for (let x = c - 1; x >= 1; x--)
      tempBoard[airY][x] = tempBoard[airY][x - 1];
    tempBoard[airY][airX] = -1;
    tempBoard[airY][1] = 0;

    board = tempBoard;
  }

  let answer = 0;
  board.forEach((line) =>
    line.forEach((num) => {
      if (num > 0) answer += num;
    })
  );
  console.log(answer);
};

const read = () => {
  let input =
    process.platform === "linux"
      ? require("fs").readFileSync("/dev/stdin")
      : require("fs").readFileSync("./17144.txt");
  input = input.toString().trim().split("\n");
  [r, c, t] = input
    .shift()
    .split(" ")
    .map((c) => parseInt(c));
  const board = input.map((line) => line.split(" ").map((c) => parseInt(c)));
  solution(board);
};

read();
