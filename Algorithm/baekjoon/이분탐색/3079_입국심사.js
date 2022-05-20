/*
	1. [[심사에 걸리는 시간, 해당 심사를 했을때 끝나는 시간] ...]으로 배열을 생성

	2. 심사에 끝나는 시간으로 정렬한다.
	3. 사람 수가 0이 될때까지 (모든 사람이 심사를 다 받을때 까지) 반복한다.
		3-1. 가장 첫번째 원소로 심사를 한다.
		3-2. 첫번째 원소의 끝나는 시간값을 answer에 넣는다.
		3-3. 변경된 값을 적절한 위치에 넣는다. (lower bound)
		3-4. 사람수를 줄인다.
	4. answer 반환
*/

//key 이하의 수가 처음으로 나오는 위치를 반환한다.
const lowerBound = (arr, start, end, key) => {
  let mid;
  if (start === end) {
    if (arr[start][1] > key) return start + 1;
    else return start;
  }
  while (start < end) {
    mid = Math.floor((start + end) / 2);
    if (arr[mid][1] > key) {
      start = mid + 1;
      continue;
    }
    end = mid;
  }
  return end;
};

const solution = (n, m, arr) => {
  let answer = 0;
  arr = arr.sort((a, b) => b[1] - a[1]);
  while (m > 0) {
    let cur = arr.pop();
    answer = cur[1];
    cur[1] += cur[0];
    const index = lowerBound(arr, 0, arr.length - 1, cur[1]);
    arr.splice(index, 0, cur);
    m--;
  }
  console.log(answer);
};
const read = () => {
  let input = require('fs')
    .readFileSync('./3079.txt')
    .toString()
    .trim()
    .split('\n');
  const [n, m] = input.shift().split(' ');
  const arr = input.map((c) => [parseInt(c, 10), parseInt(c, 10)]);
  solution(n, m, arr);
};

read();
