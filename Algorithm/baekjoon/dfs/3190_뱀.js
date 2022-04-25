/*
	사과를 먹으면 뱀 길이가 늘어난다.
	벽 또는 자기자신의 몸과 부딪히면 게임이 끝난다.

	입력
	보드의 크기 N
	사과의 갯수 K
	사과의 위치
	뱀의 방향 변환 횟수 L
	X초 후 'L' 왼쪽 'D' 오른쪽 90도 방향으로 회전.

	매 초마다
	1. 몸길이를 늘려 다음칸에 머리를 위치
	2. 이동한 칸에 사과가 있다면, 사과가 없어지고 꼬리는 그대로
	3. 만약 이동한 칸에 사과가 없다면, 몸길이를 줄여서 꼬리가 위치한 칸을 비워준다. 즉, 몸길이는 변하지 않는다.

	출력: 게임이 몇 초에 끝나는지 출력

*/
let N, K, L;
let board;
let applePositions, directionArr;
let queue = [];
let time = 0;
let direction = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const solution = () => {
  let startNum = 0;
  let endNum = 0;
  applePositions.forEach((cur) => {
    board[cur[0] - 1][cur[1] - 1] = 'a';
  });

  queue.push({ y: 0, x: 0, direction: 1 });
  while (1) {
    time++;
    const cur = queue[startNum];
    // 1. 몸길이를 늘려 다음칸에 머리를 위치
    // 2. 이동한 칸에 사과가 있다면, 사과가 없어지고 꼬리는 그대로
    // 3. 만약 이동한 칸에 사과가 없다면, 몸길이를 줄여서 꼬리가 위치한 칸을 비워준다. 즉, 몸길이는 변하지 않는다.

    queue.push({
      y: cur.y + direction[cur.direction][0],
      x: cur.x + direction[cur.direction][1],
      direction: cur.direction,
    });
    startNum++;
    //벽에 부딪힐때

    const curHead = queue[startNum];
    if (curHead.y < 0 || curHead.x < 0 || curHead.y >= N || curHead.x >= N) {
      console.log(time);
      return;
    }

    //자기 꼬리에 부딪힐때
    for (let i = endNum; i < startNum; i++) {
      const snake = queue[i];
      if (snake.y === curHead.y && snake.x === curHead.x) {
        console.log(time);
        return;
      }
    }
    if (board[curHead.y][curHead.x] === 'a') board[curHead.y][curHead.x] = 0;
    else endNum++;

    //방향 바꾸기
    directionArr.forEach((curDirection) => {
      if (curDirection[0] === time) {
        if (curDirection[1] == 'L') {
          queue[startNum].direction = Math.floor(
            (queue[startNum].direction + 1) % 4
          );
        } else if (curDirection[1] == 'D') {
          queue[startNum].direction = Math.floor(
            (queue[startNum].direction + 3) % 4
          );
        }
      }
    });
  }
};

const read = () => {
  let input = require('fs')
    .readFileSync('./3190.txt')
    .toString()
    .trim()
    .split('\n');
  N = parseInt(input.shift());
  K = parseInt(input.shift());
  applePositions = input
    .splice(0, K)
    .map((line) => line.split(' ').map((c) => parseInt(c)));
  L = parseInt(input.shift());
  directionArr = input.map((line) =>
    line.split(' ').map((c, index) => {
      if (index === 0) return parseInt(c);
      else return c;
    })
  );
  board = Array.from({ length: N }, () => new Array(N).fill(0));
  solution();
};

read();
