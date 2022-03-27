/*
반환값 : 회전할때의 제일 작은 값의 배열.
입력값 : 회전할 범위의 좌표

(2,2) (5,4)

-첫째 가로
(y1, x1) (y1, x1 + 1) (y1, x1 + 2) ... (y1, x2) 까지
-오른쪽 세로
(y1, x2) (y1 + 1, x2) (y1 + 2, x2) ... (y2, x2) 까지
-둘째 가로
(y2, x2) (y2, x2 - 1) (y2, x2 - 2) ... (y2, x1) 까지
-왼쪽 세로
(y2, x1) (y2 - 1, x2) (y2 - 2, x2) ... (y1, x1) 까지

(2,2) (2,3) (2,4)
(3,2)       (3,4)
(4,2)       (4,4)
(5,2) (5,3) (5,4)

스택에 해당 값들을 넣은 후 -> 제일 마지막값을 제일 앞으로 보내줌 -> 해당 map에 다시 스택의 제일 처음값 부터 넣는다.
*/

function solution(rows, columns, queries) {
  const map = Array.from(Array(rows + 1), () => new Array(columns + 1).fill(0));
  let num = 1;
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) map[i][j] = num++;
  }

  const answer = [];
  const stack = [];
  for (let index = 0; index < queries.length; index++) {
    const [y1, x1, y2, x2] = queries[index];

    //let temp = map[y1][x1];
    for (let i = x1; i < x2; i++) stack.push(map[y1][i]);
    for (let i = y1; i < y2; i++) stack.push(map[i][x2]);
    for (let i = x2; i > x1; i--) stack.push(map[y2][i]);
    for (let i = y2; i > y1; i--) stack.push(map[i][x1]);

    let last = stack.pop();
    stack.unshift(last);
    answer.push(Math.min(...stack));
    for (let i = x1; i < x2; i++) map[y1][i] = stack.shift();
    for (let i = y1; i < y2; i++) map[i][x2] = stack.shift();
    for (let i = x2; i > x1; i--) map[y2][i] = stack.shift();
    for (let i = y2; i > y1; i--) map[i][x1] = stack.shift();
  }
  return answer;
}
