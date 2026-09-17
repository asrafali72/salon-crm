const { Queue } = require("bullmq");
const connection = require("./connection");

const notificationQueue = new Queue(
  "notificationQueue",
  {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  }
);

module.exports = notificationQueue;