const http = require('http');	// 서버 만드는 모듈 불러오기

const fs = require('fs');

const app = http.createServer((req, res) => {
  const url = req.url;

  if (req.url == '/') {
    
  } else if (req.url === '/login') {
    res.json({
      result: 'success'
    });
  }

  req.writeHead(200);
  req.end(fs.readFileSync(__dirname + url));
});

console.log('server start');
app.listen(3001);