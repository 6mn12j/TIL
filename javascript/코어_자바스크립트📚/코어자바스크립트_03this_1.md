> **📚[코어 자바스크립트](https://book.naver.com/bookdb/book_detail.nhn?bid=15433261)**를 읽고 자바스크립트 동작 원리 이해하기, 자바스크립트 마스터의 길로...

# 📃 #03 this


#### 01 상황에 다라 달라지는 this
클래스에서만 사용가능한 것과 달리 자바스크립트에서의 this는 어디서든 사용할 수 있다. 상화아에 따라 this가 바라보는 대상이 달라지는데 어떻게 달라지는지, 왜 그렇게 되는지, 예상과 다른 대상을 바라보고 있는지 살펴보자.

자바스크립트에서 this는 기본적으로 실행 컨텍스트가 생성될 때 함께 결정된다. 실행 컨텍스트는 함수를 호출할때 생성되므로 **this는 함수를 호출할 때 결정된다**고 할 수있다.

### 전역공간,this
전역공간에서의 this

전역공간에서 this 는 전역객체를  가르킨다.
+ **브라우저 환경**에서 전역객체는 **window** 
+ **Node.js 환경**에서 전역객체는 **global**

```javascript
var a = 1;
console.log(a);			//1
console.log(this.a);		//1
console.log(window.a);		//1 브라우저 환경
console.log(global.a); 		//1 Node.js환경
#####  

```
사용자가 var 연산자를 이용해 변수를 선언하면 자바스크립트 엔진은 어떤 특정 객체(실행 컨텍스트의 `LexicalEnvironment`)의 프로퍼티로 인식한다. 
전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당한다. 변수 a에 접근하고자 할때 스코프 체인에서 a를 검색하다가 가장 마지막에 도달하는 전역 스코프의 L.E 즉, 전역객체에서 해당 프로퍼티 a를 발견해서 그값을 반환 하기 때문에 `window.a` `this.a` 분만 아니라 a를 직접 호출할때도 1이 나온다. 단순하게 (window.)(global.)이 생략된 것이라고 봐도 무방하다 고 한다.

**삭제시 차이점**

처음부터 전역객체의 프로퍼티로 할당한 경우에는 삭제가 되지만 전역변수로 선언한 경우에는 삭제가 되지 않는다.

```javascript
var a =1;
delete window.a; //false

var b =2;
delete b; //false
```

처음부터 전역객체의 프로퍼티로 할당한 경우

```javascript
window.c=3;
delete window.c; //true

window.c=4;
delete d; //true
```
이는 사용자가 의도치 않게 삭제하는것을 방지하기 위한 방어 전략이라고 한다.

### 메서드, this
메서드로서 호출할 때 그 메서드 내부에서의 this

**함수** : 자체로 독립적인 기능을 수행
**메서드** : 자신을 호출한 대상 객체애 관한 동작을 수행
이를 구별하기 위해서 자바스크립트는 상황별로  this 키워드에 다른 값을 부여하게 한다.

>어떤 함수를 호출할 때 그 이름(프로퍼티명)앞에 **객체가 명시돼 있는 경우에는 메서드**로 호출한 것이고, 그렇지 않은 모든 경우에는 **함수**로 호출한 것.

#### 메서드로서 호출 - 점 표기법, 대괄호 표기법
```javascript
var obj = {
  	method: function (x) {console.log(this, x); }
};
obj.method(1);	//{method: f } 1
obj['method'](2);	//{ method:f } 2
```

메서드 내부에서의 this
this에는 호출한 주체에 대한 정보가 담긴다. 어떤 함수를 메서드로서 호출하는 경우 호출 주체는 바로 **함수명(프로퍼티명) 앞의 객체. 점 표기법의 경우 마지막 점 앞에 명시된 객체가 곧 this**.

```javascript
var obj = {
	methodA: function () {console.log(this); },
    inner: {
    	methodB: function () { console.log(this); }
    }
};
obj.methodA();		//{methodA: f, inner:{...}} (===obj)
obj['methodA']();  	//{methodA: f, inner:{...}} (===obj)

obj.inner.methodB();	//{methodB: f}		(===obj.inner)
obj.inner['methodB'](); //{methodB: f}		(===obj.inner)
```

### 함수호출, this
함수로서 호출할 때 그 함수 내부에서의 this
 
어떤 함수를 함수로서 호출할 경우에는 this 가 지정되지 않는다.

내부함수에서의 this를 확인해 보자.
```javascript
var obj1 = {
  	outer: function() { 
      console.log(this); //(1)
      var innerFunc = function () { 
        	console.log(this); (2) (3)
      }
      innerFunc(); // 함수로서 호출한 것 this가 지정되지 않고 전역객체(Window)가 바인딩
      
      var obj2 = { 
        innerMethod: innerFunc
      };
      obj2.innerMethod(); //메서드로서  호출 this에는 객체인 obj2가 바인딩
    }
};
obj1.outer();	//메서드로서 호출 this에는 객체인 obj1가 바인딩
```
(1): obj1
(2): 전역객체(Window)
(3): obj2

>this 바인딩에 관해서는 함수를 실행하는 주변환경은 중요하지 않고 오직 해당 함수를 호출하는 구문 앞에 점 또는 대괄호 표기가 있는지 없는지가 관건.

this를 우회할때는 내부에 `var self = this;` 를 통해서, `_this`, `that`, 혹은` _ `등 다양한 변수명을 사용하여 상위 스코프의 this를 저장해서 내부함수에서 활용한다.
ES6에 추가된 **화살표 함수** 를사용하면 실행 컨텍스트 생성할 때 `this 바인딩 과정 자체가 빠지게 되어,` 상위 스코프의 this를 그대로 활용할 수 있다.
```javascript
var obj = {
	outer: function(){
    console.log(this); 		//(1){outer: f }
    var innerFunc = () =>{
    	console.log(this);	//(2) {outer: f } 
    };
    innerFunc();
  }
 };
 obj.outer();
```

### 콜백 함수, this
콜백함수 호출 시 그 함수 내부에서의 this

**콜백 함수:** 함수 A의 제어권을 다른 함수(또는 메서드) B에게 넘겨주는 경우 함수 A.

콜백 함수에서의 this 는 '무조건 이거다!'라고 정의할 수없다. 콜백 함수의 제어권을 가지는 함수(메서드)가 콜백 함수에서의 this를 무엇으로 할지를 결정하며, 특별히 정의되지 않은 경우에는 기본적으로 함수와 마찬가지로 전역객체를 바라본다.

### 생성자함수, this
생성자 함수 내부에서의 this

**생성자 함수:** 어떤 공통된 성질을 지니는 객체들을 생성하는 데 사용하는 함수.

>현실세계에서의 '인간'의 공통 특성 몇 가지만 생각해보면 직립 보행, 언어 구사, 도구 사용 등을 들 수있다. 이런 **공통 속성들을 모아** 인간 집합을 정의한 것이 바로 **클래스**이며, 각 사람들은 인간 클래스에 속하는 **인스턴스**.
각 인스턴스들은 공통점 뿐만이 아니라 저마다의 개성이 존재할 수도 있따. 프로그래밍 적으로 '생성자'는 **수체적인 인스턴스를 만들기 위한 ** 일종의 **틀**.

자바스크립트는 함수에 생성자로서의 역할을 함께 부여해서 new 명령어와 함께 함수를 호출하면 해당 함수가 생성자로서 동작하게 된다. 어떤 함수가 생성자 함수로서 호출된 경우 내부에서의 this는 곧 새로 만들 구체적인 인스턴스 자신이 된다.

**생성자 함수**
```javascript
var Cat = function (name, age) {
	this.bark = '야옹';
    	this.name = 'name;
    	this.age = age;
};
var choco = new Cat('초코', 7);  //생성자 함수 내부에서의 this는 choco 인스턴스를
var nabi = new Cat('나비', 5);	//생성자 함수 내부에서의 this는 nabi 인스턴스를 
console.log(choco, nabi);

/* 결과
Cat { bark: '야옹', anme: '초코', age: 7}
Cat { bark: '야옹', anme: '나비', age: 5}
*/
```

# 📃 정리

