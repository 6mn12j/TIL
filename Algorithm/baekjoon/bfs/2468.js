/*
반환값: 장마철에 물에 잠기지 않는 안전한 영역의 최대 개수
아무 지역도 물에 잠기지 않을 수도 있다.
물에 잠기지 않을때만 탐색한다.
1부터 물에 잠기는 높이를 높여가면서 탐색한다.
*/

const bfs = (y, x, map, visit, height, N) => {
  let num = 0;
  let queue = [];
  let dy = [0, 0, 1, -1];
  let dx = [1, -1, 0, 0];
  queue.push({ y, x });
  while (queue.length !== num) {
    const cur = queue[num];
    for (let i = 0; i < 4; i++) {
      const nextY = cur.y + dy[i];
      const nextX = cur.x + dx[i];
      if (nextY < 0 || nextX < 0 || nextY >= N || nextX >= N) continue;
      if (map[nextY][nextX] <= height || visit[nextY][nextX] !== 0) continue;
      queue.push({ y: nextY, x: nextX });
      visit[nextY][nextX] = visit[cur.y][cur.x];
    }

    num++;
  }
};

const solution = (N, map, high) => {
  let answer = [];
  let height = 0;
  while (height < high) {
    let visit = Array.from(Array(Number(N)), () =>
      new Array(Number(N)).fill(0)
    );
    let area = 0;
    answer[height] = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (map[i][j] > height && visit[i][j] == 0) {
          //방문안하고 안잠겼으면 들어감.
          visit[i][j] = ++area; //안잠긴 영역 늘림.
          bfs(i, j, map, visit, height, N);
        }
      }
    }
    answer[height] = area;
    height++;
  }
  console.log(Math.max(...answer));
};

const read = () => {
  let input = require('fs')
    .readFileSync('./2468.txt')
    .toString()
    .trim()
    .split('\n');
  let high = 0;
  const N = input.shift();
  const map = input.map((arr) =>
    arr.split(' ').map((x) => {
      if (high < +x) high = +x;
      return Number(x);
    })
  );

  solution(N, map, high);
};

read();
