/*
	n개의 트럭
	w다리의 길이.
	L다리의 최대하중
	다리 위의 무게들의 합 <= L

	트럭을 다리 위에 올려 시간을 +1 길이 확인 .

*/

let n;
let w;
let L;
let trucks;

const sumBridge = (bridge) => {
  return bridge.reduce((ac, cur) => ac + cur.weight, 0);
};

const solution = () => {
  let num = 0;
  let time = 0;
  let bridge = [];

  while (bridge.length || trucks.length) {
    //다리위에 트럭
    //움직이고 다리위에왔는지확인하고 올릴수있으면 올린다.
    for (let i = 0; i < bridge.length; i++) {
      bridge[i].distance++;
    }

    if (bridge.length && bridge[0].distance >= w + 1) {
      bridge.shift();
    }

    if (trucks.length && sumBridge(bridge) + trucks[0] <= L)
      bridge.push({ weight: trucks.shift(), distance: 1 });

    time++;
  }
  console.log(time);
};

const read = () => {
  let input = require('fs')
    .readFileSync('./1335.txt')
    .toString()
    .trim()
    .split('\n');
  [n, w, L] = input
    .shift()
    .split(' ')
    .map((c) => parseInt(c));
  trucks = input
    .shift()
    .split(' ')
    .map((c) => parseInt(c));
  solution();
};

read();
