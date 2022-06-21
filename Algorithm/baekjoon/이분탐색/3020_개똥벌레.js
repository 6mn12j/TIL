/*
	동굴의 길이는 n 미터, 높이는 h 석순 -> 종유석 순서로 생긴다.
	개똥벌레가 파괴해야하는 장애물의 최솟값 파괴된구간 출력

	구간별로 몇개가 파괴되는지를 알아야함.

*/

let n, h;
let evenStones = [];
let oddStones = [];

//아래
const checkBrokenEven = (height, cur) => {
  return evenStones[height] > cur;
};
//위
const checkBrokenOdd = (height, cur) => {
  return h - 1 - oddStones[height] < cur;
};

const solution = () => {
  let answerCnt = 0;
  const cntArr = new Array(h).fill(0);
  oddStones = oddStones.sort((a, b) => a - b);
  evenStones = evenStones.sort((a, b) => a - b);
  for (let i = 0; i < h; i++) {
    let start = 0;
    let end = Math.floor(n / 2);
    let mid = Math.floor((start + end) / 2);
    while (start < end) {
      mid = Math.floor((start + end) / 2);
      //console.log("mid", mid);

      //해당 구간에서 처음깨지는걸 구한다
      //깨지는지 확인
      //깨지면 end 줄인다
      if (checkBrokenEven(mid, i)) end = mid;
      else start = mid + 1;
    }
    cntArr[i] += n / 2 - start;
  }

  let min = 9999999999999999;
  for (let i = 0; i < h; i++) {
    let start = 0;
    let end = Math.floor(n / 2);
    let mid = Math.floor((start + end) / 2);

    while (start < end) {
      mid = Math.floor((start + end) / 2);
      //해당 구간에서 처음깨지는걸 구한다
      //깨지는지 확인
      //깨지면 end 줄인다
      if (checkBrokenOdd(mid, i)) end = mid;
      else start = mid + 1;
    }
    cntArr[i] += n / 2 - start;
    if (min > cntArr[i]) min = cntArr[i];
  }
  cntArr.forEach((cur) => {
    if (cur === min) answerCnt++;
  });
  console.log(min, answerCnt);
};

const read = () => {
  let input = require("fs")
    .readFileSync("./3020.txt")
    .toString()
    .trim()
    .split("\n");
  [n, h] = input
    .shift()
    .split(" ")
    .map((c) => parseInt(c));
  input.forEach((stone, index) => {
    if (index % 2 === 0) evenStones.push(parseInt(stone));
    else oddStones.push(parseInt(stone));
  });

  solution();
};

read();
