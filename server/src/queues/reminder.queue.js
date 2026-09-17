const { Queue } = require("bullmq");
const connection = require("./connection");

const reminderQueue = new Queue(
  "reminderQueue",
  {
    connection,
    defaultJobOptions: {
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 10000,
      },
      removeOnComplete: true,
    },
  }
);

module.exports = reminderQueue;