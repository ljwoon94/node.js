const express = require('express');
//익스프레스 모듈엔 http모듈이 내장되어 있어 서버의 역할 수행
const app = express();
const path = require('path');

app.set('port', process.env.PORT || 3000);
// app.set 서버가 실행될 포트를 설정.
// process.env 객체에 port 속성이 있다면 그 값을 사용하고 아니면 기본값 3000 사용
// app.set(키, 값)을 사용해서 데이터를 저장 가능
//app.get으로 가져오기 가능

app.use((req,res,next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next();
});

app.get('/',(req,res,next) => {
    console.log('get / 요청에서만 실행된다.')
    next();
},(req, res)=>{
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).send(err.message);
});

// app.use에 매개변수가 req, res, next 인 함수를 넣으면 된다.
// 미들웨어는 위에서부터 아래로 순서대로 실행되면서 요청과 응답 사이에
// 특별한 기능을 추가할 수 있다.
// next는 다음 미들웨어로 넘어가는 함수이다. next를 실행하지 않으면
// 다음 미들웨어가 실행되지 않는다.
// 주소를 첫번째 인수로 넣어주지 않는다면, 미들웨어는 모든 요청에서 실행되고
// 주소를 넣는다면 해당하는 요청에서만 실행된다.
// app.use 나 app.get 같은 라우터에 미들웨어를 여러개 장착 가능
// app.get 라우터에 미들웨어가 2개 연결되어 있다. 이때도 next가 필요

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