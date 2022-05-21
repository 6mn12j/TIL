//0에 가장 가까운 두 용액을 리턴

/*
l + r < 0 이면 l ++;
l + r > 0 r --;
최솟값이면 최솟값 갱신.
*/
let N;
let arr;
const solution = () => {
  let start = 0;
  let end = arr.length - 1;
  let min = 9999999999999;
  const answer = [];
  while (start < end) {
    let temp = arr[start] + arr[end];

    if (Math.abs(temp) < min) {
      min = Math.abs(temp);
      answer[0] = start;
      answer[1] = end;
    }
    if (temp < 0) start++;
    else if (temp == 0) break;
    else end--;
  }
  console.log(arr[answer[0]], arr[[answer[1]]]);
};

const read = () => {
  let input = require('fs')
    .readFileSync('./2467.txt')
    .toString()
    .trim()
    .split('\n');

  N = parseInt(input.shift());

  arr = input
    .shift()
    .split(' ')
    .map((c) => parseInt(c));
  solution();
};

read();
