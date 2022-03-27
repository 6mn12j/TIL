/*
https://www.acmicpc.net/problem/5427

반환값
- 각 테스트 케이스마다 빌딩을 탈출하는데 가장 빠른 시간
- 탈출 할 수 없는 경우에는 IMPOSSIBLE

입력
너비 w 높이 h

빈 공간. / 벽 # / 상근이 시작 위치 @/ *불
불 큐  / 상근 큐

while(상근 큐)
{
	while(불큐 -> 불큐 지금 시간꺼가지 계속 돌려)
		불 지펴줌.
	map범위 벗어나면 탈출-> 최소시간 출력
	상근 들어가는 조건 .만감. 이동한곳은 그대로 @.
}
탈출 할 수 없는 경우.
*/

const bfs = (map, queue, fireQueue, w, h) => {
  const dy = [0, 0, 1, -1];
  const dx = [1, -1, 0, 0];

  let num = 0;
  let fireNum = 0;
  while (queue.length !== num) {
    let cur = queue[num];
    let fireCur = fireQueue[fireNum];

    while (fireQueue.length !== fireNum && cur.time === fireCur.time) {
      for (let i = 0; i < 4; i++) {
        const fireNextY = fireCur.y + dy[i];
        const fireNextX = fireCur.x + dx[i];
        if (fireNextY < 0 || fireNextX < 0 || fireNextY >= h || fireNextX >= w)
          continue;
        if (
          map[fireNextY][fireNextX] === '#' ||
          map[fireNextY][fireNextX] === '*'
        )
          continue;
        fireQueue.push({ y: fireNextY, x: fireNextX, time: fireCur.time + 1 });
        map[fireNextY][fireNextX] = '*';
      }
      fireNum++;
      fireCur = fireQueue[fireNum];
    }

    for (let i = 0; i < 4; i++) {
      const nextY = cur.y + dy[i];
      const nextX = cur.x + dx[i];
      if (nextY < 0 || nextX < 0 || nextY >= h || nextX >= w) {
        console.log(cur.time + 1);
        return;
      }
      if (map[nextY][nextX] !== '.') continue;
      queue.push({ y: nextY, x: nextX, time: cur.time + 1 });
      map[nextY][nextX] = '@';
    }
    num++;
  }
  console.log('IMPOSSIBLE');
  return;
};

const solution = (w, h, map) => {
  let fireQueue = []; //불 큐
  let queue = []; //상근 큐

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (map[y][x] === '*') {
        fireQueue.push({ y, x, time: 0 });
      }
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (map[y][x] === '@') {
        queue.push({ y, x, time: 0 });
        bfs(map, queue, fireQueue, w, h);
        return;
      }
    }
  }
};

function read() {
  let input = require('fs')
    .readFileSync('./5427.txt')
    .toString()
    .trim()
    .split('\n');
  let n = parseInt(input.shift());
  while (n > 0) {
    let map = [];
    const [w, h] = input.shift().split(' ');
    map = input.splice(0, h).map((c) => c);
    map = map.map((str) => str.split(''));
    solution(w, h, map);
    n--;
  }
}

read();
