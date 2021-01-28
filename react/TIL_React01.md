# React
사용자 인터페이스를 만들기 위한 JS 프레임 워크

리액트를 왜 쓰는가?

SPA (싱글페이지어플리케이션) 사용자 인터페이스가 좋아짐, 사용자 경험이 좋아짐 , 웹앱 구현 가능, 데이터 처리 쉽게 하려고, 데이터와 화면일치를 리액트가 자동으로, 컴포넌트화를 통해 재사용 성을 높여 중복을 피할 수 있게,

1.사용자 경허

2.재사용 컴포넌트

3. 데이터 -화면 일치

리액트는 기본적으로 컴포넌트들을 렌더링할 root 가 필요하다.

속성은 Camelc case로 

onclick → onClick

만약에 버튼에서 Like 라는 글자가 바뀐다 그러면 바뀌는 부분, 바뀔수 있는 부분이 상태(state)가 됨

```jsx
render() {
          return (
            <button
              type="submit"
              onClick={() => {
                this.setState({ liked: true });
              }}
            >
              {" "}
              Like
            </button>
          );
          //JSX (JS + XML)
        }
      }

닫는괄호를 해줘야 한다. 문법이 더 엄격하다 HTML 보단 XML

컴포넌트 -> 재사용 성이 높아진다
```

```jsx
<html>
  <head>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <!-- 배포시에는 production.js로 -->
  </head>
  <body>
    <div id="root"></div>
    <!--  결과 : <div id="root"><button>Lick</button> </div>-->
    <script type="text/babel">
      class LikeButton extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            //상태를 다 적어준다
            liked: false,
          };
        }
        render() {
          return (
            <button
              type="submit"
              onClick={() => {
                this.setState({ liked: true });
              }}
            >
              {this.state.liked === true ? "Liked" : "Like"}
            </button>
          );
          //JSX (JS + XML)
        }
      }
    </script>
    <script type="text/babel">
      ReactDOM.render(<LikeButton />, document.querySelector("#root")); //만든 컴포넌트를를 Dom에 render 한다.#root에 붙혀 그린다.
      //LikeButton 컴포넌트는 대문자로 시작
    </script>
  </body>
</html>
```

```jsx
return (
            <> // 이렇게 하나도 감싸줘야 에러가 안난다 리액트는
              <div>
                {this.state.first} 곱하기 {this.state.second}는?
              </div>
              <form onSubmit={this.onSubmit}>
                <input type="number" value={this.state.value} onChange={this.onChange} />
                <button>입력!</button>
              </form>
              <div>{this.state.result}</div>
            </>
          );
```

**함수형 setState**

예전값을 쓸때는 함수를 이용해서 return 해주는게 좋다

```jsx
this.setState((preveState)=>{
return{
	value : preveState.value + 1;
})
```

리액트를 할때는 document.querySelector 쓰는 일이 줄어든다

우리는 데이터만 관리하고 리액트가 화면을 컨트롤 할 수 있게 해주는게 좋다

```jsx
<script type="text/babel">
      class GuGuDan extends React.Component {
        state = {
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: ' ',
          result: ' ',
          answer: ' ',
        };
       
        onSubmit = (e) => {
          e.preventDefault();
          if (parseInt(this.state.value) === this.state.first * this.state.second) {
            this.setState((preveState) => {
              return {
                result: '정답' + preveState.value,
                first: Math.ceil(Math.random() * 9),
                second: Math.ceil(Math.random() * 9),
                value: ' ',
              };
            });
          } else {
            this.setState({
              result: '땡',
              answer: this.state.first * this.state.second,
              value: ' ',
            });
          }
          this.input.focus(); // DOM 에 직접 접근하고 싶을때
//submit 이 끝나고 난뒤 input 에 focus를 해주고 싶음.
        };
        onChange = (e) => {
          this.setState({ value: e.target.value });
        };

        input;

        render() {
          return (
            <>
              <div>
                {this.state.first} 곱하기 {this.state.second}는?
              </div>
              <form onSubmit={this.onSubmit}>
                <input
                  ref={(c) => {
                    this.input = c; //input Dom에 직접 접근하고 싶을때
                  }}
                  type="number"
                  value={this.state.value}
                  onChange={this.onChange}
                />
                <button type="submit">입력!</button>
              </form>
              <div>{this.state.result}</div>
            </>
          );
        }
      }
    </script>
```

**setState가 이뤄질때 render 함수가 일어난다.**

함수를 따로 빼주는게 좋다  안그러면 render될때마다 함수가 계속 새로 만들어진다.

```jsx
<script type="text/babel">
      class GuGuDan extends React.Component {
        state = {
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: ' ',
          result: ' ',
          answer: ' ',
        };
        // constructor(props) {
        //   super(props);
        //   this.state = {
        //     first: Math.ceil(Math.random() * 9),
        //     second: Math.ceil(Math.random() * 9),
        //     value: ' ',
        //     result: ' ',
        //     answer: ' ',
        //   };
        // }
        onSubmit = (e) => {
          e.preventDefault();
          if (parseInt(this.state.value) === this.state.first * this.state.second) {
            this.setState((preveState) => {
              return {
                result: '정답' + preveState.value,
                first: Math.ceil(Math.random() * 9),
                second: Math.ceil(Math.random() * 9),
                value: ' ',
              };
            });
          } else {
            this.setState({
              result: '땡',
              answer: this.state.first * this.state.second,
              value: ' ',
            });
          }
          this.input.focus();
        };
        onChange = (e) => {
          this.setState({ value: e.target.value });
        };

        onRefInput = (c) => {
          this.input = c;
        };

        input;

        render() {
          return (
            <>
              <div>
                {this.state.first} 곱하기 {this.state.second}는?
              </div>
              <form onSubmit={this.onSubmit}>
                <input ref={this.onRefInput} type="number" value={this.state.value} onChange={this.onChange} />
                <button type="submit">입력!</button>
              </form>
              <div>{this.state.result}</div>
            </>
          );
        }
      }
    </script>
```
