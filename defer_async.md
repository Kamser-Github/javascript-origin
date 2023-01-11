# defer,async 스크립트
모든 브라우저는 위에서 아래로 읽는다.
```javascript
1. <script></script>
2. <script src="외부 스크립트"></script>
```
__스크립트를 만날경우 스크립트를 먼저 실행한다__
```
브라우저의 동작 방식을 두가지 이슈를 발생

1.스크립트 아래에 있는 DOM 요소에 접근 불가
따라서 아래에 DOM요소에 이벤트와 행위를 추가가 안된다.

2.페이지 위쪽에 용량이 큰 스크립트가 있을 경우
스크립트를 다 실행해야하기 때문에 아래 페이지를 읽을수 없다.
```
```html
<p> 스크립트 앞 콘텐츠 </p>

<script src="용량이 큰 스크립트.js"></script>
<!-- 스크립트가 다 읽기 전까지 아래 내용이 보이지 않는다.-->
<p> 스크립트 뒤 콘텐츠</p>
```   


> 1.맨 아래에 스크립트를 넣을 경우
```html
<body>
    <script src="스크립트.js"></script>
</body>
```
- 스크립트 위 HTML 문서 전체를 다운로드 한뒤 스크립트를 다운받기에 페이지가 느려지는 경우가 발생
   

<div>
    <table style="margin:auto; width:80%;" >
        <tr>
            <th style="text-align:center;">parsing HTML</th>
            <th style="text-align:center;">=></th>
            <th style="text-align:center;">fetching js</th>
            <th style="text-align:center;">=></th>
            <th style="text-align:center;">executing js</th>
        </tr>
    <table>
<div>
<br>

---

## __head + defer__
```html
브라우저 defer 속성이 있는 스크립트
(defer 스크립트 또는 지연스크립트)를 '백그라운드'에서 다운로드
defer 스크립트를 다운로드중에도 HTML 파싱이 멈추지 않는다.
그리고 defer 스크립트 실행은 페이지 구성이 끝날때까지 지연된다.
```
1. __예시__
```html
<p> 스크립트 앞 콘텐츠 </p>
<script defer src="스크립트.js"></script>

<!-- 바로 뒤에 html 문서를 볼수 있다. -->
<p> 스크립트 뒤 콘텐츠></p>
```
- 지연(defer) 스크립트는 페이지 생성을 막지 않는다.
- 지연 스크립트는 DOM이 준비된 후에 실행되긴 하지만 DOMContentLoaded 이벤트 발생전에 실행이된다.
- 외부스크립트에서만 사용이 가능하다.

<div>
    <table style="margin:auto; width:80%;" >
        <tr>
            <th style="text-align:center;">parsing HTML</th>
            <th style="text-align:center;">=></th>
            <th style="text-align:center;">fetching js</th>
            <th style="text-align:center;">=></th>
            <th style="text-align:center;">executing js</th>
        </tr>
    <table>
<div>
<br>

- 단점

2. __defer 예시__
```javascript
<p> 스크립트 앞 콘텐츠 </p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("`defer` 스크립트가 실행된 후, DOM이 준비되었습니다!"));
</script>

<script defer src="스크립트.js"></script>

<p> 스크립트 뒤 콘텐츠 </p>
```
<br>   
<div>
    <table style="margin:auto; width:80%;" >
        <tr>
            <th style="text-align:center;">parsing HTML</th>
            <th style="text-align:center;"> => </th>
            <th style="text-align:center;">executing js</th>
        </tr>
        <tr>
            <th style="text-align:center;">
                <div>fetching js<div>
            </th>
        </tr>
    <table>
<div>
<br>   

---

## __head + async__
```html
<html lang="en">
<head>
    <!-- js 파일 연결-->
    <script async src="hello.js"></script>
</head>
<body>
    <h1>hello</h1>
</body>
</html>
```
<div>
    <table style="margin:auto; width:80%;" >
        <tr>
            <th style="text-align:center;">parsing HTML</th>
            <th style="text-align:center; border:1px solid;">blocked</th>
            <th style="text-align:center;">parsing HTML</th>
        </tr>
        <tr>
            <th style="text-align:right">
                <span>fetching js<span>
            </th>
            <th style="text-align:center">
                <span>executing js</span>
            </th>
            <th style="boder:none"></th>
        </tr>
    <table>
<div>
<br>   

- HTML를 파싱하다가 async 스크립트를 다운로드가 완료되면 async 스크립트를 실행하고 나머지 HTML를 파싱한다.    
- body 끝 스크립트보다 시간이 단축이 된다.   

> ### 단점
- 자바스크립트가 먼저 실행이 되기때문에 뒤에 있는 DOM요소가 아직 정의가 안되어있을수가 있다.
- blocked가 있기 때문에 사용자가 페이지를 보는데 시간이 소요될수 있다.
- 정의된 스크립트의 순서에 상관없이 먼저 다운로드된 스크립트 먼저 실행하게 된다.
- 페이지가 스크립트 순서가 중요하다면 defer를 사용해야한다.


