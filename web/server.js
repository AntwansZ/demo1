// const http = require('http');
// const fs = require('fs');
const cors = require('cors');
const express = require('express');
const {spawn} = require('child_process');

py = spawn('python', ['../data_stream.py']);

const app = express();
app.use(cors())



var columns = ["ph", "iron_rate", "chlorine_rate", "magnesium_rate"];
 
//------------------------------------------------------------------


var records = [];

py.stdout.on('data', function(data) {
  console.log(data.toString());
});

py.on('close', (code) => {
  console.log("python program terminated with code ${code}");
});
 

// function print_columns(cars) {
//   console.log(cars[0]);
// }

// function print_first_car(cars) {
//   console.log(cars[1]);
// }

// app.get('/', function(req, res) {
//   console.log("page asked load");
//   // console.log(req);
//   res.send("Pong");
// });

// app.get('/loadData', function(req, res) {
//   console.log("sending data to client");
//   res.send(JSON.stringify(cars));
//   console.log("data sent");
// });

app.listen(3000, function () {
  console.log("App running on port 3000");
});
