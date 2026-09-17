const { Worker } = require("bullmq");
const connection = require("../connection");

const worker = new Worker(
  "reminderQueue",
  async (job) => {
    const {
      customer,
      phone,
      appointmentDate,
      time,
    } = job.data;

    console.log(
      `Reminder for ${customer} at ${time}`
    );

    // Send SMS / Email
  },
  { connection }
);

worker.on("completed", () => {
  console.log("Reminder Sent");
});