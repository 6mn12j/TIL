/*

	1년이 지날때마다 탐색
	k년일때 함수 종료
	한칸에 여러개의 나무가 있을 수 있다.
	나이, 양분....

  n크기의 땅에 m개의 나무
*/

let originNouristmentMap;
let nourishmentMap;
let map = [];

const dy = [-1, -1, -1, 0, 0, +1, +1, +1];
const dx = [-1, 0, +1, -1, +1, -1, 0, +1];

const dfs = (time, k) => {
  if (time === k) {
    let answer = 0;
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map.length; x++) {
        const trees = map[y][x];
        if (trees.length > 0) {
          trees.forEach((tree) => {
            if (tree > 0) answer++;
          });
        }
      }
    }
    console.log(answer);
    return;
  }

  //봄 자신의 나이만큼 양분을 먹고 나이가 1 증가한다.
  //나이가 어린 나무 부터 양분을 먹는다. 양분을 먹지 못하면 죽는다 -> -1
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      let trees = map[y][x];

      if (trees.length > 0) {
        let addNourishment = 0;
        let tempTree = [];

        trees = trees.sort((a, b) => b - a);
        for (let index = trees.length - 1; index >= 0; --index) {
          const age = trees[index];

          if (nourishmentMap[y][x] >= age) {
            nourishmentMap[y][x] -= age;
            tempTree.push(age + 1);
          } else {
            //여름 봄에 죽은 나무가 양분으로 변하게 된다. 각각의 죽은 나무마다 나이를 2로 나눈 값이 양분으로 추가된다.
            addNourishment += Math.floor(age / 2);
          }
        }

        nourishmentMap[y][x] += addNourishment;
        map[y][x] = tempTree;
      }
    }
  }

  // console.log("-----------");

  //가을 나무가 번식한다. 번식하는 나무는 나이가 5의 배수이어야 하며,인접한 8개의 칸에 나이가 1인 나무가 생긴다.
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      const trees = map[y][x];
      if (trees.length > 0) {
        trees.forEach((tree, index) => {
          if (tree % 5 === 0) {
            for (let i = 0; i < 8; i++) {
              const nextY = y + dy[i];
              const nextX = x + dx[i];
              if (
                nextY < 0 ||
                nextX < 0 ||
                nextY >= map.length ||
                nextX >= map.length
              )
                continue;
              map[nextY][nextX].push(1);
            }
          }
        });
      }
      //겨울에는 땅에 양분을 추가한다.
      nourishmentMap[y][x] += originNouristmentMap[y][x];
    }
  }
  // console.log("map", map);
  dfs(time + 1, k);
};

const solution = (positions, n, k) => {
  for (let i = 0; i < n; i++) {
    map.push([]);
    for (let j = 0; j < n; j++) {
      map[i].push([]);
    }
  }
  positions.forEach((cur) => {
    map[cur[0] - 1][cur[1] - 1] = [...map[cur[0] - 1][cur[1] - 1], cur[2]];
  });
  dfs(0, k);
};

const read = () => {
  let input =
    process.platform === "linux"
      ? require("fs").readFileSync("/dev/stdin")
      : require("fs").readFileSync("./16235.txt");

  input = input.toString().trim().split("\n");
  const [n, m, k] = input
    .shift()
    .split(" ")
    .map((c) => parseInt(c));
  originNouristmentMap = input
    .splice(0, n)
    .map((line) => line.split(" ").map((c) => parseInt(c)));

  input = input.map((cur) => cur.split(" ").map((c) => parseInt(c)));
  nourishmentMap = Array.from({ length: n }, () => new Array(n).fill(5));
  solution(input, n, k);
};

read();
