const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
 
app.use(cors());

app.use(bodyParser.json());

const auth = {
  email: 'viny5120@gmail.com',
  pw: 'asdfasdf',
  token: '1234567890'
}
const userInfo = {
  '1234567890': {
    name: 'Hobin Lee',
    email: 'viny5120@gmail.com'
  }
}

app.post('/login', function(req, res) {
  setTimeout(() => {
    try {
      if ((Math.random() * 5) < 1) throw new Error('?');
      if ((req.body.email === auth.email)
        && (req.body.password === auth.pw)) {
        res.json({
          statusCode: 200,
          token: auth.token
        });
      } else {
        throw ({
          statusCode: 500,
          message: '아이디 혹은 비밀번호가 잘 못 입력되었습니다.'
        });
      }
    } catch (err) {
      if (err.statusCode) {
        res.json(err);
      } else {
        res.json({
          statusCode: 503,
          message: '네트워크 연결 실패. 잠시 후 다시 시도해주세요.',
        });
      }
    }
  }, 1000); 
});

app.get('/user', function(req, res) {
  const token = req.headers.authorization;

  if (userInfo[token]) {
    res.json({
      statusCode: 200,
      user: userInfo[token]
    });
  } else {
    res.json({
      statusCode: 300,
      message: '잘못된 토큰 값입니다.'
    });
  }
})
 
app.listen(3001, function() {
  console.log('server is on')
});