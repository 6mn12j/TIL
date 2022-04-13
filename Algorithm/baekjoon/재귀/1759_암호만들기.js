let L;
let C;
let words;
let isUsed;
let answer = [];
const check = (words) => {
  //자음
  isVowels = words.filter((c) => {
    if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u') return c;
  });
  //모음
  isConsonants = words.filter((c) => {
    if (c !== 'a' && c !== 'e' && c !== 'i' && c !== 'o' && c !== 'u') return c;
  });

  return isVowels.length >= 1 && isConsonants.length >= 2;
};
const recursive = (i) => {
  if (answer.length === L) {
    if (check(answer)) console.log(`${answer.join('')}`);
    return;
  }

  for (let curIndex = i + 1; curIndex < C; curIndex++) {
    if (!isUsed[curIndex]) {
      isUsed[curIndex] = 1;
      answer.push(words[curIndex]);
      recursive(curIndex);
      answer.pop();
      isUsed[curIndex] = 0;
    }
  }
};
const solution = () => {
  words = words.sort();
  for (let i = 0; i < C; i++) {
    isUsed = new Array(L);
    answer.push(words[i]);
    isUsed[i] = 1;
    recursive(i);
    answer = [];
  }
};
const read = () => {
  let input = require('fs')
    .readFileSync('./1759.txt')
    .toString()
    .trim()
    .split('\n');
  [L, C] = input
    .shift()
    .split(' ')
    .map((c) => parseInt(c));
  words = input
    .shift()
    .split(' ')
    .map((c) => c);
  solution(L, C, words);
};
read();
