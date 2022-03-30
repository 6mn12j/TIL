/*
	입력: 테스트케이스의 갯수 T
	학생의수 n
	선택된 학생들의 번호
	출력: 프로젝트 팀에 속하지 못한 학생들의 수

	1) 방문한 학생인지
	2) 몇번째로 방문 했는지 cnt
	3) 가장 첫 번째로 시작한 학생....

	방문한 곳을 다시 방문했을때 ->
	1) 지금 값이 start인지 확인 지금 값이 startx 팀이 아님 return 0
	2) 지금 값이 start일때 몇명인지.
	리턴값은 팀인 인원의 수 를 리턴

	참고: https://lmcoa15.tistory.com/51
*/

const search = (studentArr, isChecked, startStudent, start, current, cnt) => {
  if (isChecked[current]) {
    if (startStudent[current] !== start) return 0;
    else return cnt - isChecked[current];
  }
  startStudent[current] = start;
  isChecked[current] = cnt;
  return search(
    studentArr,
    isChecked,
    startStudent,
    start,
    studentArr[current],
    cnt + 1
  );
};

const solution = (n, studentArr) => {
  studentArr.unshift(undefined);
  const isChecked = Array.from({ length: n }, () => 0);
  const startStudent = Array.from({ length: n }, () => 0);

  let answer = 0;
  for (let i = 1; i <= n; i++) {
    if (!isChecked[i]) {
      answer += search(studentArr, isChecked, startStudent, i, i, 1);
    }
  }
  console.log(n - answer);
};
const read = () => {
  let input = require('fs')
    .readFileSync('./9466.txt')
    .toString()
    .trim()
    .split('\n');
  const N = input.shift();

  for (let i = 0; i < Number(N); i++) {
    const studentCnt = input.shift();
    const studentArr = input
      .shift()
      .split(' ')
      .map((c) => parseInt(c));

    solution(Number(studentCnt), studentArr);
  }
};

read();
