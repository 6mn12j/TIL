/*
	N극은 0
	S극은 1
	1은 시계방향
	-1은 반시계방향
	1.돌리기전에확인한다.
	2.맞닿은곳이 다르면 회전시킨다
	3.회전하게 되면 회전한톱니바퀴 옆에도 확인한다
*/

let T;
let visit;
let wheels;

const getFlag = (test) => {
  if (test === 1) return 0;
  else if (test === 4) return 1;
  else return 2;
};

const rolling = (direction, wheel) => {
  if (direction === 1) {
    const last = wheel.pop();
    wheel.unshift(last);
    return wheel;
  } else if (direction === -1) {
    const first = wheel[0];
    wheel = wheel.filter((cur, index) => index !== 0);
    wheel.push(first);
    return wheel;
  }
};
const go = (cur, direction, flag) => {
  visit[cur] = 1;
  let isRolling;
  if (flag === 0) {
    if (cur + 1 <= 4 && !visit[cur + 1]) {
      isRolling = wheels[cur][2] !== wheels[cur + 1][6];
      isRolling && go(cur + 1, direction * -1, getFlag(cur + 1));
    }
  } else if (flag === 1) {
    if (cur - 1 >= 1 && !visit[cur - 1]) {
      isRolling = wheels[cur][6] !== wheels[cur - 1][2];
      isRolling && go(cur - 1, direction * -1, getFlag(cur - 1));
    }
  } else {
    if (cur + 1 <= 4 && !visit[cur + 1]) {
      isRolling = wheels[cur][2] !== wheels[cur + 1][6];
      isRolling && go(cur + 1, direction * -1, getFlag(cur + 1));
    }
    if (cur - 1 >= 1 && !visit[cur - 1]) {
      isRolling = wheels[cur][6] !== wheels[cur - 1][2];
      isRolling && go(cur - 1, direction * -1, getFlag(cur - 1));
    }
  }

  wheels[cur] = rolling(direction, wheels[cur]);
};
const solution = (testCase) => {
  let answer = 0;

  testCase.forEach((test, index) => {
    visit = new Array(5).fill(0);
    go(test[0], test[1], getFlag(test[0]));
  });
  wheels.forEach((wheel, index) => {
    if (index === 1 && wheel[0] === 1) answer += 1;
    else if (index === 2 && wheel[0] === 1) answer += 2;
    else if (index === 3 && wheel[0] === 1) answer += 4;
    else if (index === 4 && wheel[0] === 1) answer += 8;
  });

  console.log(answer);
};

const read = () => {
  let input = require('fs')
    .readFileSync('./14891.txt')
    .toString()
    .trim()
    .split('\n');
  wheels = input.splice(0, 4).map((wheel) => {
    return wheel.split('').map((c) => parseInt(c));
  });
  wheels.unshift([]);
  T = parseInt(input.shift());
  const testCase = input.map((test) => test.split(' ').map((c) => parseInt(c)));
  solution(testCase);
};

read();
