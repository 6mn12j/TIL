/*
https://programmers.co.kr/learn/courses/30/lessons/64063
- Map() 은 자바스크립트의 key-value 페어(pair) 로 이루어진 컬렉션
- key를 이용해서 데이터를 get, set 할 수 있음. key는 중복 x

대용량 데이터 삽입/삭제 시에는 `Map`이 키값이 중복 될 수 없어서 `Array`나 `Object`
보다 빠르다고 한다.

1. 방을 배정받을때는 Map 을이용. key 값은 해당 방번호, value는 다음크기의 방
2. 원하는 방이 비어져 있다면 배정한다 Map 에 해당 value에 다음크기의 방을 설정한다.
3. 원하는 방이 이미 채워져 있다면 해당 Key값의 value를 가져오고 value + 1로 값을 바꿔준다.

방을 배정 받으면 해당 방의 밸류 값을 다음 크기의 방으로 설정 해준다 < 여기가 효율성을 위한 부분. 해당부분은 유니온 파인드를 이용.
*/
function solution(k, room_number) {
    let rooms = new Map();
    var answer = [];

    const find=(num)=>{
        //해당방이 비어져 있을때
        if (!rooms.has(num))
        {
            //해당 방을 배정해주고 value 는 +1크기의 방으로 지정
            rooms.set(num, num + 1); 
            return num;
        }
        else //해당 방이 비어져 있지 않을때
        {
            const nearRoom = find(rooms.get(num));
            rooms.set(num, nearRoom + 1);
            return nearRoom;
        }
    }
    for (let i = 0 ; i <room_number.length ; i++)
    {
        let empty = find(room_number[i]);
        answer.push(empty);
    }
    return answer;
}
