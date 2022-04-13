/*
	'소문난 칠공주'를 결성할 수 있는 모든 경우의 수를 출력한다.
	1. 이름이 이름인 만큼, 7명의 여학생들로 구성되어야 한다.
	2. 강한 결속력을 위해, 7명의 자리는 서로 가로나 세로로 반드시 인접해 있어야 한다.
	3. 화합과 번영을 위해, 반드시 ‘이다솜파’의 학생들로만 구성될 필요는 없다.
	4. 그러나 생존을 위해, ‘이다솜파’가 반드시 우위를 점해야 한다. 따라서 7명의 학생 중 ‘이다솜파’의 학생이 적어도 4명 이상은 반드시 포함되어 있어야 한다.

	이다솜파가 몇 명인지...
	재귀를 돈다
	index 는 0 ~ 25

	dfs 를 돌면서 25명중 7 명을 선택한다.
*/
let map;
let answer = 0;
let v = 1;
let pick = Array.from({ length: 5 }, () => new Array(5).fill(0));
let visit = Array.from({ length: 5 }, () => new Array(5).fill(0));

const checkConnectCnt = (y, x) => {
  const dy = [0, 0, 1, -1];
  const dx = [1, -1, 0, 0];
  let result = 1;

  visit[y][x] = v;
  for (let i = 0; i < 4; i++) {
    const nextY = y + dy[i];
    const nextX = x + dx[i];
    if (
      nextY < 0 ||
      nextX < 0 ||
      nextY >= 5 ||
      nextX >= 5 ||
      visit[nextY][nextX] === v ||
      pick[nextY][nextX] === 0
    )
      continue;
    result += checkConnectCnt(nextY, nextX);
  }
  return result;
};

//25명의 학생 중 7명을 선택하는 조합
const dfs = (index, cnt, depth) => {
  if (depth === 7) {
    if (
      cnt >= 4 &&
      checkConnectCnt((index - 1) % 5, Math.floor((index - 1) / 5)) === 7
    )
      answer++;
    v++;
    return;
  }
  for (let i = index; i < 25; i++) {
    const y = i % 5;
    const x = Math.floor(i / 5);
    pick[y][x] = 1;
    dfs(i + 1, cnt + (map[y][x] === 'S'), depth + 1);
    pick[y][x] = 0;
  }
};
const solution = () => {
  dfs(0, 0, 0);
  console.log(answer);
};
const read = () => {
  let input = require('fs')
    .readFileSync('./1941.txt')
    .toString()
    .trim()
    .split('\n');
  map = input.map((line) =>
    line.split('').map((c) => {
      return c;
    })
  );
  solution();
};

read();
