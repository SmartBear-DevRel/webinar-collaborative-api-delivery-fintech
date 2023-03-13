const path = require('path');
const { MessageProviderPact } = require('@pact-foundation/pact');

// our client code
const { messageProducer } = require('./producer');

// 1 Messaging integration client
const producer = {
  createMessage: () => {
    return new Promise((resolve) => {
      resolve(JSON.parse(messageProducer().messages[0].value));
    });
  }
};

describe('Message provider tests', () => {
  // provider setup
  beforeAll(async () => {});

  afterAll(async () => {});

  // 2 Pact setup
  const p = new MessageProviderPact({
    messageProviders: {
      //  this is taken from description in the pact file
      'a thing event': () => producer.createMessage()
    },
    //   stateHandlers: {
    //     //  this is taken from providerStates in the pact file
    //     "a wal2json replication slot exists": () => console.log('State Change ignored as there is no state change URL provided for interaction'),
    //   },
    provider: 'example-provider-js-kafka',
    providerVersion: '1.0.0',
    pactUrls: [
      process.env.PACT_URL ??
        path.resolve(
          process.cwd(),
          'pacts',
          'example-consumer-js-kafka-example-provider-js-kafka.json'
        )
    ]
  });

  // 3 Verify the interactions
  describe('wal2Json output plugin', () => {
    it('sends a wal2json change', () => {
      return p.verify();
    });
  });
});
