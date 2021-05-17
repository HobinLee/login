const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const FileStore = require('session-file-store')(session);
const jwt = require('jsonwebtoken');

const app = express();
 
app.use(cors({
  credentials: true,
  origin: 'http://127.0.0.1:5500',
  optionsSuccessStatus: 200
}))

app.use(bodyParser.json());

app.use(cookieParser());

const auth = {
  email: 'viny5120@gmail.com',
  pw: '$2b$10$ijb6/.pdIuX9mOPOREan4OBbqGZZ8Ualbe4ObTv5zgExiVwN4gube',
  token: '1234567890'
}

let token = null;

const user = {
  name: 'Hobin Lee',
  email: 'viny5120@gmail.com'
}

app.get('/auth', function (req, res) {
  const tok = req.cookies.token;
  console.log('tok: ', tok);
  console.log('token: ', token);
  if (!tok || !token) {
    res.json({
      statusCode: 200,
      user: null
    })
  } else if (token === tok) {
    console.log('login');
    res.json({
      statusCode: 200,
      user: user
    });
  } else {
    res.json({
      statusCode: 300,
      message: '잘못된 토큰 값입니다.'
    });
  }
})

app.post('/login', function(req, res) {
    if(req.body.email === auth.email) {
      bcrypt.compare(req.body.password, auth.pw, (err, result) => {
        if (result) {
          token = jwt.sign(req.body.email, "hovLee");
          res.cookie('token', token, {
            httpOnly: true,
            path: "auth",
          }).sendStatus(200);
        } else {
          //비밀번호 입력 오류
          res.json({
            statusCode: 500,
            message: '아이디 혹은 비밀번호가 잘 못 입력되었습니다.'
          });
        }
      })
    } else {
      //아이디 입력 오류
      res.json({
        statusCode: 500,
        message: '아이디 혹은 비밀번호가 잘 못 입력되었습니다.'
      });
    }
});

app.get('/logout', (req, res) => {
  console.log('logout');
  res.clearCookie('token', {
    path: "/"
  }).sendStatus(200);
  token = null;
});

app.get('/user', function(req, res) {
  const tok = req.headers.authorization;

  if (token === tok) {
    res.json({
      statusCode: 200,
      user: user
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