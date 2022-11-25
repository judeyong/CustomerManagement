const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql');
const db = require('./db');
const path = require('path');
const multer = require('multer');

//createpool 과 connection의 차이점 알기.
const connection = mysql.createConnection({
  host : '127.0.0.1',
  user : 'root',
  password: '123456',
  port: '3306',
  database: 'management'
});
connection.connect();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
})

const upload = multer({ storage: storage});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/api/hello', (req,res) => {
    res.send({ mesaage: 'hello Express!' });
});


app.get('/api/customer', (req,res) => {
  db.query("SELECT * FROM customer WHERE isDeleted = 0", (err, data) => {
    if(!err) res.send(data);
    else res.send(err);
  })
  console.log('conn customer');
});

// app.get('/api/test', (req,res) => {
//   const sql = "SELECT * FROM customer";
//   connection.query(sql, (err, rows)=>{
//     if(!err) {
//       res.send(rows);
//     }else {
//       res.send(err);
//     }}
//   )
//   console.log('conn test');
// });

//앞의'/image'는 접근경로 './upload'는 접근하는 디렉토리경로.
//app.use('/file', upload.single('file'), express.static('upload'));

app.use('/file', express.static('uploads'));

app.post('/api/customer', upload.single('file'), (req,res) => {
  console.log('req.body', req.body);
  console.log('req.file', req.file);

  const sql = 'INSERT INTO customer VALUES (null, ?, ?, ?, ?, ?, now(),0)';
  let file = '/file/' + Date.now() + req.file.filename;
  let name = req.body.userName;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  
  console.log('file',file);
  console.log('userName',name);
  console.log('birthday',birthday);
  console.log('gender',gender);
  console.log('job',job);

  let rows = [file, name, birthday, gender, job];

  connection.query(sql, rows, (err,rows) => {
    res.send(rows);
    if(err){
      console.log(err);
    }
  });

});

app.delete('/api/customer/:id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params, (err, rows) => {
    res.send(rows);
  });
})

app.listen(port, ()=> console.log(`Listening on port ${port}`));