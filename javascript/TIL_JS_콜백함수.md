함수 정의, 호출, 그리고 콜백함수
function add(num1, num2){
 return num1 + num2;
}
const doSomething = add;

const result = doSomething(2,3);
함수도 object 중 하나 .

add 라는 변수를 가진 메모리에는 add함수의 ref(주소값)이 할당 되어 있다.

이름 자체는 함수가 정의된 곳을 가르킨다.

doSomething 에는 함수가 정의된 곳이 할당 된다.

function add(num1, num2){
 return num1 + num2;
}

function divide(num1,num2){
 return num1 / num2;
}

function surprise(callback){ //add가 정의된값이 전달
 const result = callback(2,3); //add를 수행
 console.log(result);
}
//surprise 라는 함수에 add함수를 전달.
surprise(add);  //add(2,3) 5
surprise(divide); //divide(2,3) 0.66666
연산자 boolean 의 모든것 && 연산자
//false : 0 , -0, '', null, undefined
//true : -1, 'hello', 'false'

let num;
if(num) {
 console.log('true!');
} else {
 console.log('false!');
}
//false! 출력

num && console.log(num);
-----------------------------------------
//false : 0 , -0, '', null, undefined
//true : -1, 'hello', 'false'

let num = 9 ;
if(num) {
 console.log('true!');
} else {
 console.log('false!');
}
//false! 출력

//num이 ture 이면(&&) num을 출력
num && console.log(num); //9
왜? 이렇게 써야할까

let obj; //undefined

if(obj){
 console.log(obj);
}

 //error가 뜬다 프로그램 자체가 동작x
console.log(obj.name);

//obj가 true(값이 있다면)출력된다. 

------------------------------------------
동일한 내용의 코드.
obj && console.log(obj.name);
if(obj){ console.log(obj); }

클래스 클래스 예제와 콜백 함수
class Counter {
 constructor() {
  this.counter = 0 ;
 }
//class에서 함수 선언시 function 작성 안해도됨
 increase() { 
  this.counter ++;
  console.log(this.counter);
 }
}

const coolCounter = new Counter();
coolCounter.increase(); //1
coolCounter.increase(); //2
coolCounter.increase(); //3
🤔counter 값이 5일때 알고싶다

1.방법 → 방법1일때는 컨트롤이 안됨. 만약 yo가아니라 사용자에게 팝업을 보여주고 싶다면? yo가 아니라 다른 말을 출력하고 싶다면?

class Counter {
 constructor() {
  this.counter = 0 ;
 }
//class에서 함수 선언시 function 작성 안해도됨
 increase() { 
  this.counter ++;
  console.log(this.counter);
  if(this.counter % 5 ===0){
   console.log('yo!');
  }
 }
}

const coolCounter = new Counter();
coolCounter.increase(); //1
coolCounter.increase(); //2
coolCounter.increase(); //3
coolCounter.increase(); //4
coolCounter.increase(); //5 /n yo!
방법2

class Counter {
 constructor() {
  this.counter = 0 ;
 }
//class에서 함수 선언시 function 작성 안해도됨
 increase(runIf5Times) { 
  this.counter ++;
  console.log(this.counter);
  if(this.counter % 5 ===0){
   runIf5Times();
  }
 }
}

const coolCounter = new Counter();
function printSomething() {
	console.log('yo'!);
}
coolCounter.increase(printSomething); //1
coolCounter.increase(printSomething); //2
coolCounter.increase(printSomething); //3
coolCounter.increase(printSomething); //4
coolCounter.increase(printSomething); //yo! 
------------------------------------------------
//만약 지금 숫자를 알고 싶다면?
class Counter {
 constructor() {
  this.counter = 0;
 }
 increase(runIf5Times) { 
  this.counter ++;
  console.log(this.counter);
  if(this.counter % 5 ===0){
   runIf5Times(this.counter);
  }
 }
}
const coolCounter = new Counter();
function printSomething(currentNum) {
 console.log(`yo!${currentNum}`);
}
function alertNum(currentNum) {
 alert(`wow!${currentNum}`);
}
coolCounter.increase(printSomething); //1
coolCounter.increase(printSomething); //2
coolCounter.increase(printSomething); //3
coolCounter.increase(printSomething); //4
coolCounter.increase(printSomething); //yo! 5 
coolCounter.increase(alertNum); //팝업으로 wow!  6
🤔문제는? : increse라는 함수를 호출할때마다 콜백함수를 전달하기가 귀찮다

constructor에 this.callback을 할당.

counter를 만들때 생성자에 원하는 callback함수를 전달.

const coolCounter = new Counter(printSomething);

class Counter {
	constructor(runEvryFiveTimes) {
		this.counter = 0 ;
		this.callback = runEvryFiveTimes
	}
//class에서 함수 선언시 function 작성 안해도됨
	increase(runIf5Times) { 
		this.counter ++;
		console.log(this.counter);
		if(this.counter % 5 ===0){
			this.callback(this.counter);
		}
	}
}

const coolCounter = new Counter();
function printSomething() {
	console.log('yo'!);
}
coolCounter.increase(printSomething); //1
coolCounter.increase(printSomething); //2
coolCounter.increase(printSomething); //3
coolCounter.increase(printSomething); //4
coolCounter.increase(printSomething); //yo! 

----------------------------------------------
//만약 지금 숫자를 알고 싶다면?
increase(runIf5Times) { 
	this.counter ++;
	console.log(this.counter);
	if(this.counter % 5 ===0){
		this.callback(this.counter);
	}
}
function printSomething(currentNum) {
	console.log(`yo!${currentNum}`);
}
function alertNum(currentNum) {
	alert(`alert!${currentNum}`);
}

const coolCounter = new Counter(printSomething);

coolCounter.increase(); //1
coolCounter.increase(); //2
coolCounter.increase(); //3
coolCounter.increase(); //4
coolCounter.increase(; //yo! 5 

----------------------------------
const alertNum = new Counter(alertNum);
coolCounter.increase(); //팝업으로 alert!  1
callback 이 있을때만 실행하도록

//만약 지금 숫자를 알고 싶다면?
class counter(){
	constructor(runEveryFiveTimes){
		this.counter = 0;
		this.callback = runEveryFiveTimes;
	}
	increase(runIf5Times) { 
		this.counter ++;
		console.log(this.counter);
		if(this.counter % 5 ===0){
			if(this.callback){
				this.callback(this.counter);}
		}
	}
}
function printSomething(currentNum) {
	console.log(`yo!${currentNum}`);
}
function alertNum(currentNum) {
	alert(`alert!${currentNum}`);
}

const coolCounter = new Counter(printSomething);

coolCounter.increase(); //1
coolCounter.increase(); //2
coolCounter.increase(); //3
coolCounter.increase(); //4
coolCounter.increase(; //yo! 5 

----------------------------------
const alertNum = new Counter(alertNum);
coolCounter.increase(); //팝업으로 alert!  1
&& 을 써서 깔끔하게 한줄로

//만약 지금 숫자를 알고 싶다면?
increase(runIf5Times) { 
	this.counter ++;
	console.log(this.counter);
	if(this.counter % 5 ===0){
		this.callback && this.callback(this.counter);
}
function printSomething(currentNum) {
	console.log(`yo!${currentNum}`);
}
function alertNum(currentNum) {
	alert(`alert!${currentNum}`);
}

const coolCounter = new Counter(printSomething);

coolCounter.increase(); //1
coolCounter.increase(); //2
coolCounter.increase(); //3
coolCounter.increase(); //4
coolCounter.increase(); //yo! 5 

----------------------------------
const alertNum = new Counter(alertNum);
coolCounter.increase(); //팝업으로 alert!  1
class 우리가 원하는 기능을 정의하게 되면 재사용이 떨어지고, 자세하게 컨트롤이 할 수 없다.

callback 함수를 이용하면 자세한 컨트롤이 가능하다.

즉 하나의 class로 다양한 오브젝트를 만들어서 사용이 가능하다.

	
class Counter {
 constructor (runEveryFiveTimes){
  this.counter =0;
  this.callback = runEveryFiveTimes;
 }
 increase() { 
  this.counter ++;
  console.log(this.counter);
  if(this.counter % 5 ===0){
   this.callback && this.callback(this.counter);
  }
 }
}
function printSomething(currentNum) {
 console.log(`print!${currentNum}`);
}
function alertNum(currentNum) {
 alert(`alert!${currentNum}`);
}

const printCounter = new Counter(printSomething);
const alertCounter = new Counter(alertNum);
