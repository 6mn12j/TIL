/*
	스타트 링크

	총 F층으로 이루어져 있고 엘리베이터는 U(위로 U층) D(아래로 D층)을 가는 버튼만 있다.

	입력 : F S G U D
	건물은 1층 부터 시작하고 가장 높은 층은 F층
	출력 :S층에서 G층으로 가기 위해 눌러야 하는 버틍의 수의 최솟값
	갈 수 없을때는 use the stairs

	bfs로 순회할때 갈 수 있는 곳이 +U, -D
	범위는 1층 부터 F층까지만 가능하다
	탈출하는 조건은 G층일때.

*/

const solution = (maxFloor, start, goal, up, down) => {
  const queue = [];
  const isVisited = Array.from({ length: maxFloor }, () => false);
  const elevator = [up, -down];
  let num = 0;
  queue.push({ floor: start, cnt: 0 });

  if (start === goal) {
    console.log(0);
    return;
  }
  while (queue.length !== num) {
    const cur = queue[num];
    for (let i = 0; i < 2; i++) {
      const nextFloor = cur.floor + elevator[i];

      if (nextFloor === goal) {
        console.log(cur.cnt + 1);
        return;
      }
      if (nextFloor < 1 || nextFloor > maxFloor) continue;
      if (isVisited[nextFloor] === true) continue;
      queue.push({ floor: nextFloor, cnt: cur.cnt + 1 });
      isVisited[nextFloor] = true;
    }
    num++;
  }
  console.log('use the stairs');
  return;
};
const read = () => {
  const [F, S, G, U, D] = require('fs')
    .readFileSync('./5014.txt')
    .toString()
    .trim()
    .split(' ')
    .map((c) => parseInt(c));
  solution(F, S, G, U, D);
};

read();
