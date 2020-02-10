// const http = require('http');
// const fs = require('fs');
const cors = require('cors');
const express = require('express');

const kafka = require('kafka-node');

const app = express();

app.use(cors())

app.get('/favicon.ico', (req, res) => res.status(204));

// getting last offest, in order not to load the 
// whole queue every time

var columns = ["ph", "iron_rate", "chlorine_rate", "magnesium_rate"];

function read_pipe_from_beginning() {
  var client = new kafka.KafkaClient();
  var consumer = new kafka.Consumer(
    client,
    [ { topic: 'water', partition :0} ],
    {autoCommit : false} 
    );  
}


var options = {
  kafkaHost:'localhost:9092',
  fromOffset:'latest'
}

var consumer = new kafka.ConsumerGroup(
    options, 
    ['water']);
//------------------------------------------------------------------


var records = [];

function parse_data(message) {
  var raw_data = message.value;

  tab_data = raw_data.split(",");
  var station_no = parseInt(tab_data.pop());
  tab_data = tab_data.map(function(val, index) {
      return parseFloat(val);
    });
  return {data : tab_data, time:message.timestamp, station: station_no};
}

consumer.on('message', function (message) {
    console.log(message);
    records.push(parse_data(message));
});

app.get('/update', function(req,res) {
  console.log("Update request from client");
  res.send(JSON.stringify(records));
  records = [];
});

app.get('/', function(req, res) {
  console.log("Client asked for page");
  res.send("Pong");
});

app.listen(3000, function () {
  console.log("App running on port 3000");
});
