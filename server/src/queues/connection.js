const dotenv = require("dotenv");
dotenv.config();
const IORedis = require("ioredis");

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS,
  maxRetriesPerRequest: null, // Required for BullMQ
});

module.exports = connection;