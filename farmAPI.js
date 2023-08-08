var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var mysql = require('mysql2'); //npm install mysql
var app = express();
app.use(cors());
app.use(bodyParser.json());
//MYSQL
var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    insecureAuth: true,
    database: "demo"
});
// in workbench
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY'your_password';
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!!!")
    var sql = "SELECT * FROM farm";
    con.query(sql, function (err, results) {
        if (err) throw err;
        console.log(results);
    })
});
app.get('/farm', function (req, res) {
    var sql = "SELECT * FROM farm";
    con.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    });
})
app.get('/farm/:ID', function (req, res) {
    const { id } = req.params
    var sql = "SELECT * FROM farm where ID=" + id + ""
    con.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    });
})
// app.post('/farm', function (req, res) {
//     const { id, namefarm, codefarm, decsription, thumb   } = req.body
//     //sample { id: 4, deviceName: 'DHT22' }
//     var sql = "insert farm values(" + id + ",'" + namefarm + "');";
//     con.query(sql, function (err, results) {
//         if (err) throw err;
//         res.send('Add farm ok');
//     });
// })
// Assuming you have already set up the 'con' variable as the MySQL connection

app.post('/farm', function (req, res) {
    const { id, namefarm, codefarm, description, thumb } = req.body; // Corrected 'description'
  
    var sql = "INSERT INTO farm (id, namefarm, codefarm, description, thumb) VALUES (?, ?, ?, ?, ?)";
    var values = [id, namefarm, codefarm, description, thumb];
  
    con.query(sql, values, function (err, results) {
      if (err) throw err;
      res.send('Add farm ok');
    });
  });
  
var server = app.listen(1234, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server is listening at http://%s:%s", host, port)
})