const { Kafka } = require('kafkajs');
const assert = require('assert').strict;
const kafka = new Kafka({
  clientId: 'test-app',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: 'test', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: JSON.parse(message.value)
      });
      await handler(JSON.parse(message.value));
    }
  });
};

const args = process.argv.slice(2);
if (args[0] === '--start') {
  run().catch(console.error);
}

class Thing {
  constructor(foo) {
    assert(foo, 'foo is a mandatory field');
    this.foo = foo;
  }
}

class ThingRepository {
  constructor() {
    this.things = new Map([['boo', new Thing('boo')]]);
  }

  async fetchAll() {
    return [...this.things.values()];
  }

  async getById(id) {
    return this.things.get(id);
  }

  async insert(thing) {
    return this.things.set(thing.id, thing);
  }
}

const repository = new ThingRepository();

const handler = async (message) => {
  console.log('received message:', message);
  Promise.resolve(repository.insert(new Thing(message.foo)));
  console.log(await repository.fetchAll());
};

module.exports = {
  Thing,
  ThingRepository,
  handler
};
