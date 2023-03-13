const {
  Matchers,
  MessageConsumerPact,
  asynchronousBodyHandler,
} = require("@pact-foundation/pact");
const {handler} = require('./consumer')
const { like, term } = Matchers;

const path = require("path");

describe("Kafka handler", () => {
  const messagePact = new MessageConsumerPact({
    consumer: "example-consumer-js-kafka",
    dir: path.resolve(process.cwd(), "pacts"),
    pactfileWriteMode: "update",
    provider: "example-provider-js-kafka",
    logLevel: "info",
  });

  describe("receive a thing update", () => {
    it("accepts a thing event", () => {
      return messagePact
        .expectsToReceive("a thing event")
        .withContent({
          foo: like("whee"),
        })
        .withMetadata({
          "kafka_topic": "test",
        })
        .verify(asynchronousBodyHandler(handler));
    });
  });
});