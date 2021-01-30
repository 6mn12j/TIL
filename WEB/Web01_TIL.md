> [생활코딩 강의 ](https://www.youtube.com/watch?v=t7ASgtJoVz4) 듣고 HTTP, REST API, Ajax 정리

# HTTP

웹브라우저와 웹서버가 통신할때 사용하는 규약 HTTP

## HyperText Transfer Protocol

서버와 클라이언트가 주고받기 위한. 통신 규약 

HTTP → Request /  Response 를 위한 메시지로 구분 되어져 있다.

웹브라우저는 사용자가 요청하는 정보를 웹서버에게 대신 물어봐 준다. 응답헤더를 웹서버가 응답해준다. → 받은 응답을 웹브라우저는 브라우저에 그려준다.

![https://www3.ntu.edu.sg/home/ehchua/programming/webprogramming/images/HTTP_RequestMessageExample.png](https://www3.ntu.edu.sg/home/ehchua/programming/webprogramming/images/HTTP_RequestMessageExample.png)

User-Agent: 웹브라우저의 다른 이름. (어떤 브라우저 , 어떤 운영체제를 쓰는지 볼 수 있음)

Accept-Encoding: 네트워크 자원을 아끼기위해 .웹브라우저가 압축하는 방식

**TTP-3.Request message**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/51d46cfc-6574-49be-9cc4-f7d0a26fc8f5/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/51d46cfc-6574-49be-9cc4-f7d0a26fc8f5/Untitled.png)

**HTTP-4.Response message**

![https://jsstudygroup.github.io/jsStudyBlog/assets/images/post/http_resHeader.jpg](https://jsstudygroup.github.io/jsStudyBlog/assets/images/post/http_resHeader.jpg)

### **status**

응답 상태코드

리소스 요청에 대한 응답은 응답 상태코드로 설명할 수 있다.

- 200 - 요청을 정상 수행
- 201 - 리소스 생성 요청 성공(Post로 생성 요청 시에 한함)
- 3xx - Redirection
- 400 - 요청이 부적절함
- 401 - 인증되지 않은 상태에서 보호된 리소스 요청
- 403 - 공개되지 않은 리소스에 접근 요청(인증과 무관)
- 404 - 존재하지 않는 리소스 요청
- 406 - 지원하지 않는 미디어타입을 요청
- 409 - 리소스 상태에 의해 해당 요청을 수행하지 못함
- 5xx - Sever error

[HTTP 상태코드 자세히 보기](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C)

Response Header

```xml
ache-control: no-cache, no-store, must-revalidate
content-encoding: gzip
content-type: text/html; charset=UTF-8
date: Sat, 30 Jan 2021 09:14:18 GMT
p3p: CP="CAO DSP CURa ADMa TAIa PSAa OUR LAW STP PHY ONL UNI PUR FIN COM NAV INT DEM STA PRE"
pragma: no-cache
referrer-policy: unsafe-url
server: NWS
strict-transport-security: max-age=63072000; includeSubdomains
x-frame-options: DENY
x-xss-protection: 1; mode=block
```

Request Header

```xml
:authority: www.naver.com
:method: GET
:path: /
:scheme: https
accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
accept-encoding: gzip, deflate, br
accept-language: ko-KR,ko;q=0.9
cookie: NM_THEME_EDIT=; NNB=Y6GZURXSNCTF6; ASID=7a2b60f700000175ad0410690000006b; NM_RTK_VIEW_GUIDE=1; RTK_YES=1; NRTK=ag#20s_gr#1_ma#-2_si#-2_en#2_sp#-1; _ga=GA1.1.82286025.1607878652; _ga_7VKFYR6RV1=GS1.1.1607878651.1.1.1607879230.60; nx_ssl=2; PM_CK_loc=b95c055d0d6b4b3b139b3db634d3c6cb8445c80d925a6a46bd2e6b87731cb411
sec-fetch-dest: document
sec-fetch-mode: navigate
sec-fetch-site: cross-site
sec-fetch-user: ?1
upgrade-insecure-requests: 1
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```

# REST API

resouece(정보) 는 uri를 통해서 표현

Resouece의 많은 정보들은 topic 

topic 하나 하나는 Element , Element들이 모이면 Collection 

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dcad62a8-0da7-4ee0-b21f-7e35b9e5a2a2/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dcad62a8-0da7-4ee0-b21f-7e35b9e5a2a2/Untitled.png)

Resource 정보를 가공하는 방법은 많아 보이지만 크게 4가지가 있다.

**C**reate /  **R**ead /  **U**pdate / **D**elete →

method post / get  /delete / (전체 )put  부분 (fetch) 수정

# Ajax

페이지의 리로드 없이 보여줄 수 있음. 부분적으로 업데이트가 가능.

```jsx
<!DOCTYPE html>
<html>
  <body>
    <input
      type="button"
      value="fetch"
      onclick="fetch('html').then(function(response){    // 서버에게 html이라는 파일을 요청
        response.text().then(function(text){
            alert(text);                                             // 서버가 응답해 준 데이터가 text에 저장된다.
        })
    })"
    />
  </body>
</html>

```

then() 메서드는 성공한 경우를 처리하고, catch() 메서드는 거절된 경우를 처리합니다.

```jsx
<!DOCTYPE html>
<html>
  <body>
    <article></article>
    <input
      type="button"
      value="fetch"
      onclick="fetch('html').then(function(response){    // 서버에게 html이라는 파일을 요청
        response.text().then(function(text){
            const article = document.querySelector('article');
            article.innerHTML = text;                                         // 서버가 응답해 준 데이터가 text에 저장된다.
        })
    })"
    />
  </body>
</html>
```

사용법을 먼저 보고 . 자유도가 떨어질때 원리를 찾아보자.

클라이언트가 일단 요청 fetch("javascript") 자바스크립트란 파일을 줘 

**fetch**라는 파일은 서버로부터 파일을 요청

```jsx
<!DOCTYPE html>
<html>
  <body>
    <article></article>
    <input
      type="button"
      value="fetch"
      onclick=" /*fetch('html').then(function(response){ // 서버에게 html이라는 파일을 요청 response.text().then(function(text){ const article =
    document.querySelector('article'); article.innerHTML = text; // 서버가 응답해 준 데이터가 text에 저장된다. }) })*/
    //Asynchronous
    const callbackme=()=>{console.log('respond end')}; 
    fetch('html').then(callbackme);
    console.log(1);
    console.log(2);"
//1 2 respond end
    />
  </body>
</html>
```

fetch 는 response 객체가 첫 인자 값

```jsx
<!DOCTYPE html>
<html>
  <body>
    <article></article>
    <input
      type="button"
      value="fetch"
      onclick=" /*fetch('html').then(function(response){ // 서버에게 html이라는 파일을 요청 response.text().then(function(text){ const article =
    document.querySelector('article'); article.innerHTML = text; // 서버가 응답해 준 데이터가 text에 저장된다. }) })*/
    //Asynchronous
    const callbackme=(res,req)=>{
    if(res.status === 404){
        alert('Not found');
    }}; 
    fetch('ajax').then(callbackme);
    console.log(1);
    console.log(2);"
    />
  </body>
</html>
```
