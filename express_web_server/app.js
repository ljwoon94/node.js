const express = require('express');
//익스프레스 모듈엔 http모듈이 내장되어 있어 서버의 역할 수행
const app = express();
const path = require('path');

app.set('port', process.env.PORT || 3000);
// app.set 서버가 실행될 포트를 설정.
// process.env 객체에 port 속성이 있다면 그 값을 사용하고 아니면 기본값 3000 사용
// app.set(키, 값)을 사용해서 데이터를 저장 가능
//app.get으로 가져오기 가능
app.get('/',(req, res)=>{
//    res.send('Hello, Express'); 문자열을 전송라고 싶을 땐 res.send
    res.sendFile(path.join(__dirname, '/index.html'));

});
// app.get(주소, 라우터)는 주소에 대한 GET 요청이 올 때
// 어떤 동작을 할지 적는 부분이다.
// 매개변수 req는 요청에 관한 정보가 들어 있는 객체,
// res는 응답에 관한 정보가 들어 있는 객체
// 요청은 post, put, patch, delete, options 등이 있다.


app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
});