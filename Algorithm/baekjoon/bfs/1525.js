const swap = (i, j, str) => {
  return (
    str.substring(0, i) +
    str[j] +
    str.substring(i + 1, j) +
    str[i] +
    str.substring(j + 1)
  );
};

const solution = (str) => {
  let queue = [];
  let visit = {};
  queue.push(str);
  visit[str] = 1;
  if (str === '123456780') {
    console.log(0);
    return;
  }
  let num = 0;
  while (queue.length !== num) {
    let curStr = queue[num];
    for (let i = 0; i < 9; i++) {
      if (curStr[i] === '0') {
        if (i - 1 >= 0 && i !== 3 && i !== 6) {
          let strTemp = swap(i - 1, i, curStr);
          ㄴ;
          if (strTemp === '123456780') {
            console.log(visit[curStr]);
            return;
          }
          if (visit[strTemp] === undefined) {
            queue.push(strTemp);
            visit[strTemp] = visit[curStr] + 1;
          }
        }

        if (i !== 8 && i !== 2 && i !== 5) {
          let strTemp = swap(i, i + 1, curStr);
          if (strTemp === '123456780') {
            console.log(visit[curStr]);
            return;
          }
          if (visit[strTemp] === undefined) {
            queue.push(strTemp);
            visit[strTemp] = visit[curStr] + 1;
          }
        }
        if (i - 3 >= 0) {
          let strTemp = swap(i - 3, i, curStr);
          if (strTemp === '123456780') {
            console.log(visit[curStr]);
            return;
          }
          if (visit[strTemp] === undefined) {
            queue.push(strTemp);
            visit[strTemp] = visit[curStr] + 1;
          }
        }
        if (i + 3 < 9) {
          let strTemp = swap(i, i + 3, curStr);
          if (strTemp === '123456780') {
            console.log(visit[curStr]);
            return;
          }
          if (visit[strTemp] === undefined) {
            queue.push(strTemp);
            visit[strTemp] = visit[curStr] + 1;
          }
        }
      }
    }
    num++;
  }
  console.log(-1);
  return;
};

const read = () => {
  let input = require('fs')
    .readFileSync('./1525.txt')
    .toString()
    .trim()
    .split('\n');

  let regex = / /gi;

  let str = input.reduce((ac, cur) => ac + cur);
  str = str.replace(regex, '');

  solution(str);
};

read();
