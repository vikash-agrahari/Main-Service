import { config } from 'dotenv';

const env = process.env.NODE_ENV || false;
if (!env) process.exit(100);

config({ path: `bin/.env.${env}` });

export default () => ({
  PORT: process.env.PORT,
  ENV: process.env.NODE_ENV,
  DB_URL: process.env.URI,
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
});
