# 클래스
클래스는 연관 있는 것들을 묶어놓은 컨테이너같은 것.

class Person{

name; //속성(feild)

age;//속성(feild)

speak(); //행동(method)

}

class →붕어빵틀

-template, declare once 한번 선언, nodata

object → 팥붕어빵

-instance of a class, created many times, data in

'use strict'

class: template

object: instance of a class

-introduced in ES6

## 1.class 선언

```javascript
class Person{
    //constructor
    constructor(name, age){
        //fields
        this.name=name;
        this.age=age;
    }
//method
speak(){
    console.log(`${this.name}: hello!`);
    }
}

const ellie = new Person('ellie', 20);
console.log(ellie.name);
console.log(ellie.age);
ellie.speark();
```

## 2.Getter and setters

```javascript
class User {
    constructor(firstName, lastName, age){
        thie.firstName = firstName;
        thie.lastName = lastName;
        this.age = age;
    };
    get age(){
        return this._age; //이름을 다르게 
    } 
    set age(value){
        if(value < 0 ){
            throw Error('age can not be negative');
        }
        this._age = value <0 ? 0 : value;
    }
}
```

사용자가 user의 나이를 실수로 -1로 설정했을때 사람의 나이가 -1살이라는건 말이 안된다 . 

이렇게 클래스를 사용하는 사용자가 잘못사용해도 방어적으로 사용하도로 해주는게 Getter와 setters.

get을 이용해서 값을 return ,set을 이용해서 값을 설정(값을 받아와야 함)

`this.age = age;`

get age() 처럼 getter를 정의하는 순간 this.age는 메모리에 올라가있는 age를 읽어오는 것이 아니라 getter를 호출

setter를 정의하는 순간 =age 값에 할당할때 메모리값을 바로 할당하는게 아니라 setter를 호출

## 3.Fields(Public & Private)

```javascript
class Experiment{
    publicField = 2;
    #privateField = 0;
}
const experiment = new Experiment();
console.log(experiment.publicField); //2
console.log(experiment.privateField); //undefined
```

## 4.static

class안의 field와 method 들이 object와 data에 상관없이 동일하게 반복적으로 사용되어지는 class 고유의 값이 사용 될때

```javascript

class Article{
    static publisher = '6mn12j Coding';
    constructor(articleNumber) {
        this.articleNumber = articleNumber;
    }
    
    static printPublisher() {
        console.log(Article.publisher);
    }
}

const article1 = new Article(1);
const article2 = new Article(2);
console.log(article.publisher); //undefined
console.log(Article.publisher); //6mn12j Coding
Article.printPublisher(); //6mn12j Coding

```

static은 object마다 x class 자체에 값이  할당 되어져 있음.
들어오는 데이터에 상관없이 공통적인 값을 사용할때 많이 사용.

## 5.상속 & 다양성

```javascript

getArea(){
        return this.width * this.height / 2;
    }
    //Object의 toString 오버라이딩
    toString(){
        return `Triangle: color : ${this.color}`;
    }
}

const rectangle = new Rectangle(20, 20, 'blue');
const triangle = new triangle(20,20,'red');
rectangle.draw(); //drawing blue color of

//dawing red color of
//세모
//부모가 먼저 그다음 세모 
triangle.draw(); 
rectangle.getArea(); //400
triangle.getArea(); //200
```

## 6.Class checking: instanceOf

왼쪽의 object가 오른쪽 class의 instance 인지 아닌지 object가 class로 인해 만들어 진 아이인지 아닌지 ,,,?확인 ,,,?

```javascript
console.log(rectangle instanceof Rectangle); //true
console.log(triangle instanceof Rectangle); //F
console.log(triangle instanceof Triangle); //true
console.log(triangle instanceof Shape);//true
console.log(triangle instanceof Object); //true 자바스크립트의 모든 class들은 자바스크립트의 Object를 상속
```
# 오브젝트
## 1.Literals and properties

Objects

one of the JavaScript's data types.

a collection of related data and/or functionality.

Nearly all objects in JavaScript are instances of Object

object는 key와 value의 집합체

object = {key : value};

```javascript
const name = '6mn12j;
const age = 4;
print(name, age);

function print(name,age){
	console.log(name);
	console.log(age);
} 
//만약 주소가 추가되고 풀네임, 라스트 네임 등 인자가 많아지면 추가해야 될게 많아진다.
//이런 점들을 개선 하고자 오브젝트 사용.
fucntion print(person){
	console.log(person.name);
	console.log(person.age);
}
const ellie={name:'ellie',age:4};
print(ellie);  //ellie 4

const obj1 = {}; //'object literal' syntax
const obj2 = new Object(); //'object constructor' syntax

//can add properties later
ellie.hasJob = true;

console.log(ellie.hasJob); //true

//can delete properties later

delete ellie.hasJob;
console.log(ellie.hasJob); //undefined 
```

클래스가 없어도 {} 를이용해서 바로 오브젝트 생성이 가능.

다이나믹클립타입랭귀지

## 

## 2.Computed properties

```javascript
console.log(ellie.name); //ellie
console.log(ellie['name']); //ellie
```

두개가 동일한 출력. 오브젝트는 ' . ' 으로 접근이 가능하고 배열에서 데이터를 받아오는것과같이도 접근이 가능하다. 

[//key](//key) should be always string key는항상 string으로 

 `console.log(ellie[name]);` x

`console.log(ellie['name]);` o

'.' 으로 접근할때는 코딩하는 순간 그 key에 해당하는 값을 받아오고 싶을때, computed properties를 쓸때는 어떤 key가 필요한지 모를때 즉, runtime 에서 쓸때 사용 한다. 실시간으로 원하는 key를 받아올때.

```javascript
function printValue(obj, key) {
	console.log(obj.key);
}
printValue(ellie, 'name'); //undefined

//동적으로 key를 받아오는 경우
function printValue(obj, key){
	console.log(obj[key]);
}
printValue(ellie, 'name'); //ellie;
printValue(ellie, 'age'); //4
```

## [3.Property](http://3.Property) value shorthand

```javascript
const person1 = { name:' bob' , age: 2 };
const person2 = { name: 'steve' , age: 3 };
const person3 = { name: 'dave' , age: 4 };
const person4 = mew Person('ellie',30);

//4. Constructor function
//함수에 값만 전달해주면 person을 만들어주는 함수.
function Person(name,age){
		//this = {};
	this.name = name;
	this.age = age;
	//return this
}
```

## 5.inoperator: property existence check (key in obj)

```javascript
console.log('name' in ellie);//T
console.log('age' in ellie); //T
console.log('random' in ellie); //F 
console.log(ellie.random); //undefined
```

## 6. for  .. in vs for ..of

```javascript
//for (key in obj)
for (key in ellie){
	console.log(key); // name age hasJob
}

//for (value of iterable)
const array = [1, 2, 4 ,5];
for(value of array){
	console.log(value) //1 2 4 5
}
```

## 7. Cloning

// Object.assign(dest, [obj, obj2, obj3...])

 

```javascript
const user = {name: 'ellie', age ='20'};
const user2 = user;
console.log(user);

//old way
const user3 = {};
for (key of user){
	user3[key] = user[key];
}
console.log(user3); //{name:"ellie",age:"20"}

const uer4 = Object.assign({},user);
console.log(user4); //{name:"ellie",age:"20"}
```

[//another](//another) example

```javascript
const fruit1 = {color: 'red'};
const fruit2 = {color: 'blue', size: 'big'};
const mixed = Object.assign({}, fruit1, fruit2);
console.log(mixed.color); //blue
console.log(mixed.size); //big
```




