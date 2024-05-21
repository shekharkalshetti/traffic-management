const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'traffic-visualization',
    brokers: ['localhost:9092'],
});

const admin = kafka.admin();

const createTopics = async () => {
    await admin.connect();
    await admin.createTopics({
        topics: [
            {
                topic: 'traffic-data',
                numPartitions: 4,
            },
        ],
    });
    await admin.disconnect();
    console.log('Topics created successfully');
};

createTopics().catch(console.error);
