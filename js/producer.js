const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'test-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner
});

const run = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: 'test',
    messages: messageProducer
  });
  await producer.disconnect();
};

const args = process.argv.slice(2);
if (args[0] === '--start') {
  run().catch(console.error);
}

const messageProducer = () => {
  const message = {
    topic: 'test',
    messages: [{ value: JSON.stringify({ foo: 'bar' }) }]
  }
  console.log("sending message:",message)
  return message
};

module.exports = {
  messageProducer
};
