const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'traffic-producer',
    brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const produceTrafficData = async () => {
    await producer.connect();
    setInterval(async () => {
        const messages = [];
        for (let i = 1; i <= 4; i++) {
            messages.push({
                partition: i - 1,
                value: JSON.stringify({
                    partition: i,
                    numOfVehicles: Math.floor(Math.random() * 100),
                }),
            });
        }
        await producer.send({
            topic: 'traffic-data',
            messages,
        });
        console.log('Traffic data sent:', messages);
    }, 5000);
};

produceTrafficData().catch(console.error);
