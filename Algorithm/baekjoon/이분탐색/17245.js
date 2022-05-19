//이분탐색
//각 갯수를 센다 -> 절반이상이면 낮춘다.

const getCnt = (value, board) => {
  let cnt = 0;

  board.forEach((cur) => {
    cur.forEach((num) => {
      if (value >= num) {
        cnt += num;
      } else {
        cnt += value;
      }
    });
  });
  return cnt;
};

const solve = (n, board, total, max) => {
  let start = 0;
  let end = max;
  while (start < end) {
    let mid = Math.floor((start + end) / 2);

    if (Math.floor(getCnt(mid, board)) >= Math.ceil(total / 2)) {
      //절반이상이 켜진 경우
      end = mid;
    } else start = mid + 1;
  }
  console.log(start);
};

const read = () => {
  let input = require('fs')
    .readFileSync('./17245.txt')
    .toString()
    .trim()
    .split('\n');
  let total = 0;
  let max = 0;
  const n = input.shift();
  const board = input.map((line) =>
    line.split(' ').map((c) => {
      let value = parseInt(c, 10);
      total += value;
      if (max < value) max = value;
      return value;
    })
  );
  solve(n, board, total, max);
};

read();
