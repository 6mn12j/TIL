/*
	1.집의 좌표를 sort
	2. 이분탐색으로 최대 좌표부터 줄여나가면서 확인
	줄여나갔을때 n개만큼 설치할 수 있으면 end = mid, 값을 줄인다.
	mid = 5
	1   5
	mid -> 3
	1 3
	1   9 -> 10
	1 5
	1 2 4 8 9
	mid = 5
	0       4 mid -> arr[0] + arr[4] / 2 = 5


*/

const getCnt = (c, mid, arr) => {
  let i = 1;
  let prev = 0;
  c--;
  while (i < arr.length && c) {
    if (arr[i] - arr[prev] >= mid) {
      prev = i;
      c--;
    }
    i++;
  }
  return c === 0;
};

const solution = (c, arr) => {
  arr = arr.sort((a, b) => a - b);
  let start = 0;
  let end = arr[arr.length - 1];

  while (start < end) {
    let mid = Math.ceil((start + end) / 2);
    if (getCnt(c, mid, arr)) {
      start = mid;
    } else end = mid - 1;
  }
  console.log(start);
};

const read = () => {
  let input = require('fs')
    .readFileSync('./2110.txt')
    .toString()
    .trim()
    .split('\n');
  const [n, c] = input
    .shift()
    .split(' ')
    .map((c) => parseInt(c));
  let max = 0;
  const arr = input.map((c) => {
    const num = parseInt(c);
    max = max < num ? num : max;
    return num;
  });
  solution(c, arr);
};

read();
