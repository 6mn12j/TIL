const getCnt = (arr, mid) => {
  let cnt = 0;
  arr.forEach((cur) => (cnt += Math.floor(cur / mid)));
  return cnt;
};
const solve = (k, n, arr) => {
  let start = 1;
  let end = Math.pow(2, 31) - 1;
  while (start < end) {
    let mid = Math.floor((start + end + 1) / 2);
    if (getCnt(arr, mid) >= n) start = mid;
    else end = mid - 1; //mid가 n개미만이면 절대 답이 아니니까 mid-1
  }
  console.log(start);
};

const read = () => {
  let input = require('fs')
    .readFileSync('./1654.txt')
    .toString()
    .trim()
    .split('\n');
  const [k, n] = input.shift().split(' ');
  const arr = input.map((c) => parseInt(c));
  solve(k, n, arr);
};
read();
