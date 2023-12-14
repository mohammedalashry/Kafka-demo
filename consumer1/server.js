const express = require("express");
const sockio = require('socket.io');
const kafka = require("kafka-node");
const app=express();
app.get("/", async (_, response) => {
    response.sendFile("home.html",{root:__dirname});
});
const server=app.listen(3030, async () => { 
    console.log("server runs")
});
const io=sockio(server);
io.on('connection', (socket) => {
    console.log('New connection')
})
io.on('update', (data) =>{
    console.log("try",data);
  })
var   client = new kafka.KafkaClient(
    {
        kafkaHost: '172.19.0.3:9092'
    }
);
const topics = ["topic2", "topic3"]; // Specify topics to consume from
const consumer = new kafka.Consumer(
    client,[
        { topic: 'topic2', partition: 0 }, { topic: 'topic3', partition: 1 }
    ],
    {
        autoCommit: true, // Enable automatic commit
        autoOffsetReset: "earliest", // Start from the beginning offset
    }
  
);
var mesgs;
consumer.on("message", function (message) {
  const { topic, partition, offset } = message;
  const data = message.value.toString(); // Parse message data
  mesgs=`Consumed message from ${topic}:${partition}:${offset}: ${data}`
  console.log(mesgs);
  callSockets(io, mesgs);
});
consumer.addTopics(topics, function () {
  console.log("Consumer ready to consume messages");
});
function callSockets(io, message){
    io.sockets.emit('update', message);
}

