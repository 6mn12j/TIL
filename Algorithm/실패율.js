/*
반환값:  실패율이 높은 스테이지부터 내림차순으로 스테이지의 번호가 담겨있는 배열

실패율: 스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수 / 스테이지에 도달한 플레이어 수
입력값: 전체 스테이지이지 갯수 N, 사용자가 현재 멈춰있는 스테이지 번호 배열 stages
stage배열 값: 현재 도전 중인 스테이지의 번호

1. 스테이지당 실패율 -> N 크기배열에 실패율을 넣는다.

2. stages에서 나온 값 ->스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수
N스테이지에 도달한 플레이어수   N이상 스테이지 도달한 플레이어수를 구하면된다.

변수를 배열로 두개만든다 . 1. 클리어하지못한 플레이어를 담음 2. 스테이지에 도달한

1. 스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수
스테이지배열을 순회하면서 해당 숫자가 나오면 1. ++;

2.스테이지에 도달한 플레이어수
스테이지 배열 순회하면서 N이상이면 2++;

*/

function solution(N, stages) {
  let arr = [];
  const clearPlayer = new Array(Number(N + 1)).fill(0);
  const notClearPlayer = new Array(Number(N + 1)).fill(0);
  const info = [];
  stages.forEach((stopStage) => {
    notClearPlayer[stopStage]++;
    for (let i = 1; i <= stopStage; i++) clearPlayer[i]++;
  });

  for (let i = 1; i <= N; i++) {
    if (clearPlayer[i] === 0) info.push({ stage: i, fail: 0 });
    else fail[i] = notClearPlayer[i] / clearPlayer[i];
  }

  //실패율이 담겨있음 각인덱스는 해당 스테이지-1
  //내림차순으로 정렬해서 출력해야되는데 .
  // for (let i = 1; i <= N; i++) arr.push({ stage: i, fail: fail[i] });
  const sorted = arr.sort((a, b) => b.fail - a.fail);

  //같은 실패율이면 작은번호가 먼저 오게 해야함 .........

  return sorted.map((data) => data.stage);
}
