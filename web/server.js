// const http = require('http');
// const fs = require('fs');
const cors = require('cors');
const express = require('express');

const kafka = require('kafka-node');

const app = express();
app.use(cors())



var columns = ["ph", "iron_rate", "chlorine_rate", "magnesium_rate"];
var client = new kafka.KafkaClient();
var consumer = new kafka.Consumer(
  client,
  [ {topic: 'water', partition :0} ],
  {autoCommit : false} 
  );
//------------------------------------------------------------------


var records = [];


consumer.on('message', function (message) {
    console.log(message);
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
