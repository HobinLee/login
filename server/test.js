const bcrypt = require('bcrypt');

const saltRounds = 10;
const input = 'asdfasdf';
const pw = '$2b$10$ijb6/.pdIuX9mOPOREan4OBbqGZZ8Ualbe4ObTv5zgExiVwN4gube';

bcrypt.compare(input, pw, (err, res) => {
  console.log(res);
})