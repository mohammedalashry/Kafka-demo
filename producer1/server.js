const server = require("express")();
const { Kafka } = require("kafkajs")

// the client ID lets kafka know who's producing the messages
const clientId = "producer1"
// we can define the list of brokers in the cluster
const brokers = ["172.19.0.3:9092"]
// this is the topic to which we want to write messages
const topic = "topic2"
const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()
async function  produce1(){
	await producer.connect()
    let i = 0
	// after the produce has connected, we start an interval timer
	setInterval(async () => {
		try {
			await producer.send({
				topic,
				messages: [
					{
						key: String(i),
						value: "this is message " + i,
					},
				],
			})
			// if the message is written successfully, log it and increment `i`
			console.log("writes: ", i)
			i++
		} catch (err) {
			console.error("could not write message " + err)
		}
	}, 5000)
}

// initialize a new kafka client and initialize a producer from it

server.listen(3000, async () => { });
server.get("/", async (_, response) => {
    produce1();
    response.send("<html> <head>producer Nodejs</head><body><h1> Producer 1</h1></body></html>");
});
