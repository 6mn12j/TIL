//출력 분리되어 나누어지는 영역 개수 넓이를 빈공간을 두고오름차순으로 출력.
//입력 되는 M, N, K는 모두 100 이하의 자연수
//N y, M x

//1. 직사각형 좌표를 받아서 직사각형을 그린다.
//1-1 주는값을 배열에 저장했다가 배열을 돌면서 좌표를찍는다.
//1-2 x1을 시작으로 x2 까지 순회 / y1부터 y2까지 순회.

//2. 그다음에 분리된 곳을 확인해야된다.
//분리된곳을 확인하려면 초기값과 분리된값이 달라야함
//직사각형이 아닌곳을 들어가면서 확인한다. 분리된곳을 확인할때마다 넓이가 증가해야됨.(처음 확인할때 ++)

//3. 분리된 갯수와 넓이를 오름차순으로 출력.

// x,y
//(0,2) (4,4)
//y2-y1  x2 - x1
//x1부터 x2-x1만큼 간다.
//x1 x1+1 x1+2 x1+3 i 시작 x1 부터가면됨 x2까지
//
//0,2 /1,2/ 2,2/3,2
//0,3 /1,3/2,3/3,3

//넓이를 확인하는 함수.
const check = (y, x, map, visit) => {
  let num = 0;
  let queue = [];
  let width = 1;
  const dy = [0, 0, 1, -1];
  const dx = [1, -1, 0, 0];
  queue.push({ y, x });
  visit[y][x] = true;

  while (queue.length !== num) {
    const cur = queue[num];
    for (let i = 0; i < 4; i++) {
      const nextY = cur.y + dy[i];
      const nextX = cur.x + dx[i];
      if (
        nextY < 0 ||
        nextX < 0 ||
        nextY >= map.length ||
        nextX >= map[0].length
      )
        continue;
      if (map[nextY][nextX] === 1 || visit[nextY][nextX] !== 0) continue;
      queue.push({ y: nextY, x: nextX });
      visit[nextY][nextX] = true;
      width++;
    }
    num++;
  }
  return width;
};

const solution = (M, N, K, value) => {
  const map = Array.from(Array(Number(M)), () => new Array(Number(N)).fill(0));

  const visit = Array.from(Array(Number(M)), () =>
    new Array(Number(N)).fill(false)
  );
  let arr = []; //넓이 저장하는 배열
  //직사각형 찍기
  value.forEach((data) => {
    const [x1, y1, x2, y2] = data.split(' ').map((c) => Number(c));
    for (let y = y1; y < y2; y++) {
      for (let x = x1; x < x2; x++) {
        map[y][x] = 1;
      }
    }
  });
  for (let y = 0; y < M; y++) {
    for (let x = 0; x < N; x++) {
      if (map[y][x] !== 1 && visit[y][x] === false) {
        arr.push(check(y, x, map, visit));
      }
    }
  }
  console.log(arr.length);
  arr.sort((a, b) => a - b);
  console.log(...arr);
  return;
};

const read = () => {
  let input = require('fs')
    .readFileSync('./2583.txt')
    .toString()
    .trim()
    .split('\n');
  const [M, N, K] = input.shift().split(' '); // Y X 직사각형갯수
  solution(M, N, K, input);
};

read();
