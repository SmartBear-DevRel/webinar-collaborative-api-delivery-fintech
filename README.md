# Workshop & Webinar showcasing a collaborative API Delivery scenario

A repo storing assets related to webinar demonstrating a collaborative API design and delivery journey using SwaggerHub, ReadyAPI, and Pactflow

## Kafka

### Pre-requisite's


1. Java
2. Kafka

#### Linux

For Ubuntu based distros

```sh
sudo apt update -y 
sudo apt install -y default-jdk
wget https://dlcdn.apache.org/kafka/3.4.0/kafka_2.13-3.4.0.tgz
tar xzf kafka_2.13-3.4.0.tgz 
sudo mv kafka_2.13-3.4.0 /usr/local/kafka
```

Zookeeper must be running in the background

```sh
/usr/local/kafka/bin/zookeeper-server-start.sh /usr/local/kafka/config/zookeeper.properties
```

#### MacOS

```sh
brew install kafka zookeeper
```

Zookeeper must be running in the background

```sh
zkServer start
```

#### Windows

Best done with WSL2, see Linux instructions.

### Setup your first kafka server and see messages being transferred

1. Start a Kafka server locally
   1. `/usr/local/kafka/bin/kafka-server-start.sh /usr/local/kafka/config/server.properties` - Linux
   2. `kafka-server-start /opt/homebrew/etc/kafka/server.properties` - MacOS M1
   3. `kafka-server-start /usr/local/etc/kafka/server.properties` - MacOS Intel
2. Create a topic titled `test`
   1. `/usr/local/kafka/bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic test` - Linux
   2. `kafka-topics --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic test` - MacOS M1
3. Start a consumer which will consume messages published to the `test` topic
   1. Realtime
      1. `/usr/local/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test` - Linux
      2. `kafka-console-consumer --bootstrap-server localhost:9092 --topic test` - MacOS
   2. From beginning
      1. `/usr/local/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning`  - Linux
      2. `kafka-console-consumer --bootstrap-server localhost:9092 --topic test --from-beginning` - MacOS
4. Start a provider which will publish messages to the `test` topic
   1. `/usr/local/kafka/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test` - Linux
   2. `kafka-console-producer --broker-list localhost:9092 --topic test` - MacOS
5. You can start typing messages into the producer, and see them shown in the consuming app.
   1. We will use the following data in our example `{"foo":"bar"}`

### Create an automated test suite to publish a message, and check it is received  

_ensure your kafka server is started, and the `test` topic is created, before running step 6_

1. Download ReadyAPI
2. Setup a new project, and add a Kafka API to it, with the channel/topic set to `test`
   1. https://support.smartbear.com/readyapi/docs/testing/kafka/add-api.html#create
3. Create an API connection with a publish step
4. Add the data `{"foo":"bar"}`
5. Create an API connection with a subscribe step
6. Click on the Test suite and select run.
7. In the subscribe step, Add the smart-assertion with the key name `foo` and value must equal `bar`
   1. This will check we receive the message sent in our publish step
      1. `{"foo":"bar"}`
8. You can now save this project, we will utilise this later in our continuous integration tests with ReadyAPI's [test-runner](https://support.smartbear.com/readyapi/docs/functional/running/automating/about.html)