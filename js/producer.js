const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'test-app',
  brokers: ['localhost:9092']
})

const producer = kafka.producer()

const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'test',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })
}

run().catch(console.error)


// const kafka = require('kafka-node');
// const Producer = kafka.Producer;
// const client = new kafka.KafkaClient();
// const producer = new Producer(client);

// const payloads = [
//   { topic: 'test', messages: 'New sale happened', partition: 0 },
//   { topic: 'test', messages: ['Refund', 'Sale'] }
// ];

// producer.send(payloads, function (error, data) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(data);
//   }
// });
