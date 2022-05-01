let N;
let arr;
let answer = 0;

const getCnt = (index, flag) => {
  let result = 1;
  if (flag == 's') {
    for (let i = index; i < arr.length; i++) {
      if (arr[i] != arr[i + 1]) return result;
      result++;
    }
  } else if (flag == 'e') {
    for (let i = index; i > 0; i--) {
      if (arr[i] != arr[i - 1]) return result;
      result++;
    }
  }
  return result;
};

const find = (startIndex) => {
  let start = startIndex + 1;
  let end = arr.length - 1;
  while (start < end) {
    let target = arr[startIndex] * -1;

    if (target < arr[start] + arr[end]) end--;
    else if (target > arr[start] + arr[end]) start++;
    else {
      if (arr[start] === arr[end]) {
        answer += ((end - start + 1) * (end - start)) / 2;
        return;
      } else {
        let startCnt = getCnt(start, 's');
        let endCnt = getCnt(end, 'e');
        answer += startCnt * endCnt;
        start += startCnt;
        end -= endCnt;
      }
    }
  }
};

const sloution = () => {
  arr = arr.sort((a, b) => a - b);
  arr.forEach((target, index) => {
    find(index);
  });
  console.log(answer);
};

const read = () => {
  let input = require('fs')
    .readFileSync('./3151.txt')
    .toString()
    .trim()
    .split('\n');
  N = parseInt(input.shift());
  arr = input
    .shift()
    .split(' ')
    .map((c) => parseInt(c));
  sloution();
};

read();
