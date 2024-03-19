import { config } from 'dotenv';

const env = process.env.NODE_ENV || false;
if (!env) process.exit(100);

config({ path: `bin/.env.${env}` });

export default () => ({
  PORT: process.env.PORT,
  ENV: process.env.NODE_ENV,
  DB_URL: process.env.MONGO_URI,
  DB_Name: process.env.DB_NAME,
  KAFKA_BROKER_1: process.env.KAFKA_BROKER_1 || 'BROKER_1',
  KAFKA_BROKER_2: process.env.KAFKA_BROKER_2 || 'BROKER 2',
  KAFKA_TOPIC_PRODUCER: process.env.KAFKA_TOPIC_PRODUCER,
  KAFKA_HOST: process.env.KAFKA_HOST,
  KAFKA_PORT: process.env.KAFKA_PORT,
  KAFKA_PARTITION: process.env.KAFKA_PARTITION,
  KAFKA_REPLICATION: process.env.KAFKA_REPLICATION,
  KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
  FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NO: process.env.TWILIO_PHONE_NO,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  HOST: process.env.HOST,
  SECRET_KEY: process.env.SECRET_KEY,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_MOBILE_NO: process.env.ADMIN_MOBILE_NO
});
