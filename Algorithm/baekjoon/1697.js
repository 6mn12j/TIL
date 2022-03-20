function solution() {
  let input = require('fs')
    .readFileSync('./1697.txt')
    .toString()
    .trim()
    .split(' ');

  let num = 0;
  const queue = [];
  const visit = [];
  const target = input[1];
  queue.push(input[0] * 1);
  visit[input[0] * 1] = 0;
  if (input[0] === input[1]) {
    console.log(0);
    return;
  }

  const check = (queue, cur, next) => {
    if (next === Number(target)) {
      //종료조건
      console.log(visit[cur] + 1);
      return 1;
    }
    if (next < 0 || next > 100000 || visit[next] !== undefined) return 0;
    queue.push(next);
    visit[next] = visit[cur] + 1;
    return 0;
  };

  while (num !== queue.length) {
    const cur = queue[num];

    if (check(queue, cur, cur + 1)) return;
    if (check(queue, cur, cur - 1)) return;
    if (check(queue, cur, cur * 2)) return;
    num++;
  }

  //걸으면 +1 / -1 , 순간이동 2*
}

solution();
