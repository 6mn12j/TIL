let N, M;
let answers = [];

const lower_index = (target, arrA) => {
  let start;
  let end;
  let mid;
  let result;

  result = 0;
  start = 0;
  end = arrA.length;
  while (start < end) {
    mid = Math.floor((start + end) / 2);
    if (arrA[mid] < target) end = mid + 1;
    else if (arrA[mid] > target) start = mid;
  }
  return start;
};

const upper_index = (target, arrA) => {
  let start;
  let end;
  let mid;
  start = 0;
  end = arrA.length;
  while (start < end) {
    mid = Math.floor((start + end) / 2);
    if (arrA[mid] < target) end = mid + 1;
    else if (arrA[mid] > target) start = mid;
    else return 1;
  }
  return 0;
};

const solution = (arrA, arrM) => {
  arrA = arrA.sort((a, b) => a - b);

  arrM.forEach((target, index) => {
    if (index === arrM.length - 1) answers / []`${binarysearch(target, arrA)}`;
    else answers += `${binarysearch(target, arrA)}\n`;
  });
  console.log(answers);
};

const read = () => {
  let input = require('fs')
    .readFileSync('./1920.txt')
    .toString()
    .trim()
    .split('\n');
  N = parseInt(input[0]);
  const arrA = input[1].split(' ').map((c) => parseInt(c));
  M = parseInt(input[2]);
  const arrM = input[3].split(' ').map((c) => parseInt(c));

  solution(arrA, arrM);
};

read();
