const { Kafka } = require('kafkajs');
const io = require('socket.io-client');

const kafka = new Kafka({
    clientId: 'traffic-consumer',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'traffic-group' });

const consumeTrafficData = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'traffic-data', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const trafficData = JSON.parse(message.value.toString());
            console.log(`Received traffic data from partition ${partition}:`, trafficData);
            socket.emit('trafficData', trafficData); // Emit traffic data to Socket.IO server
        },
    });
};

consumeTrafficData().catch(console.error);
