const { Worker } = require("bullmq");
const connection = require("../connection");

const worker = new Worker(
  "notificationQueue",
  async (job) => {
    const {
      customer,
      phone,
      type,
      message,
    } = job.data;

    console.log("Sending Notification");

    console.log(customer);

    console.log(type);

    console.log(phone);

    console.log(message);

    // Email / SMS / WhatsApp API
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log("Notification Sent:", job.id);
});

worker.on("failed", (job, err) => {
  console.log("Failed:", err.message);
});