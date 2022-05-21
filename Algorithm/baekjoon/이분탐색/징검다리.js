/*
    1. stones에서 제일 큰값 을 가져온다 max
    2. mid수 만큼 징검다리를 건넌다. 반복한다 -> 어떻게 건너는데
        2-1. stones에서 해당 하는 값들에 대해서 -1
        2-1. 건널 수 있으면 범위를 줄인다
    0 1 2 3 4 5
    s   m     e
*/

// const getCnt = (mid, stones, maxStoneCnt) => {
//     let i = 0;
//     let prev = 0;
//     let distance = 0;
//     while(mid && distance < maxStoneCnt)
//     {
//         if (i >= stones.length)
//         {
//             //징검다리 끝에 도착 했을때
//             mid --;
//             i = 0;
//             prev = 0;
//             distance = 0;
//             continue;
//         }
//         if (stones[i] >= 1)
//         {
//             //건넜을때
//             stones[i] --;
//             prev = i;
//             distance = 0;
//             i ++;
//             continue;
//         }
//         i ++;
//         distance ++;
//     }
//     return(mid === 0);
// }

const getCnt = (mid, stones, maxMoveLen) => {
  //mid(인원수) 만큼 징검다리를 건널 수 있는지 확인 하는 함수.
  //mid수 만큼 다 건너갈 수 있으면 true 아니면 false 반환.

  let brokenLen = 0; //못 건너는 돌의 갯수.
  let maxBrokenLen = 0; //못 건너는 돌의 최대 갯수.

  //못건너는경우: 못건너는 연속된 돌의 갯수가 k이상이 되는경우.

  for (const stone of stones) {
    if (mid > stone) {
      brokenLen++;
      maxBrokenLen = Math.max(brokenLen, maxBrokenLen);
      if (maxBrokenLen === maxMoveLen) break;
    } else brokenLen = 0;
  }
  return maxBrokenLen < maxMoveLen;
};

function solution(stones, maxMoveLen) {
  let minCnt = 200000001;
  let maxCnt = 0;
  stones.forEach((stone) => {
    if (stone < minCnt) minCnt = stone;
    if (stone > maxCnt) maxCnt = stone;
  });
  while (minCnt < maxCnt) {
    let midCnt = Math.ceil((minCnt + maxCnt) / 2);
    if (getCnt(midCnt, stones, maxMoveLen)) minCnt = midCnt;
    else maxCnt = midCnt - 1;
  }
  return minCnt;
}
