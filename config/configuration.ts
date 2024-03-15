import * as dotenv from 'dotenv';
export const APP_CONSTANTS = {
  ENV: 'NODE_ENV',
  DEV: 'dev',
  QA: 'qa',
  LOCAL: 'local',
};

 let appConfig = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        DB_URL: process.env.DEV_DB_URL,
        KAFKA_BROKER_1: process.env.KAFKA_BROKER_1 || 'BROKER_1',
        KAFKA_BROKER_2: process.env.KAFKA_BROKER_2 || 'BROKER 2',
        KAFKA_TOPIC_PRODUCER: process.env.KAFKA_TOPIC_PRODUCER,
        KAFKA_HOST: process.env.KAFKA_HOST,
        KAFKA_PORT: process.env.KAFKA_PORT,
        KAFKA_PARTITION: process.env.KAFKA_PARTITION,
        KAFKA_REPLICATION: process.env.KAFKA_REPLICATION,
        KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID
  },
};
switch (process.env.NODE_ENV) {
  case 'dev':
    // dotenv.config({ path: '' });
    appConfig = {
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        DB_URL: process.env.DEV_DB_URL,
        KAFKA_BROKER_1: process.env.KAFKA_BROKER_1 || 'BROKER_1',
        KAFKA_BROKER_2: process.env.KAFKA_BROKER_2 || 'BROKER 2',
        KAFKA_TOPIC_PRODUCER: process.env.KAFKA_TOPIC_PRODUCER,
        KAFKA_HOST: process.env.KAFKA_HOST,
        KAFKA_PORT: process.env.KAFKA_PORT,
        KAFKA_PARTITION: process.env.KAFKA_PARTITION,
        KAFKA_REPLICATION: process.env.KAFKA_REPLICATION,
        KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID

      },
    };
    console.log('appconfig ===================> ', appConfig);
    break;
  case 'stag':
    dotenv.config({ path: '.env.stag' });
    appConfig = {
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        DB_URL: process.env.DEV_DB_URL,
        KAFKA_BROKER_1: process.env.KAFKA_BROKER_1 || 'BROKER_1',
        KAFKA_BROKER_2: process.env.KAFKA_BROKER_2 || 'BROKER 2',
        KAFKA_TOPIC_PRODUCER: process.env.KAFKA_TOPIC_PRODUCER,
        KAFKA_HOST: process.env.KAFKA_HOST,
        KAFKA_PORT: process.env.KAFKA_PORT,
        KAFKA_PARTITION: process.env.KAFKA_PARTITION,
        KAFKA_REPLICATION: process.env.KAFKA_REPLICATION,
        KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID

      },
    };
    break;
  case 'local':
    dotenv.config({ path: '.env.local' });
    appConfig = {
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        DB_URL: process.env.DEV_DB_URL,
        KAFKA_BROKER_1: process.env.KAFKA_BROKER_1 || 'BROKER_1',
        KAFKA_BROKER_2: process.env.KAFKA_BROKER_2 || 'BROKER 2',
        KAFKA_TOPIC_PRODUCER: process.env.KAFKA_TOPIC_PRODUCER,
        KAFKA_HOST: process.env.KAFKA_HOST,
        KAFKA_PORT: process.env.KAFKA_PORT,
        KAFKA_PARTITION: process.env.KAFKA_PARTITION,
        KAFKA_REPLICATION: process.env.KAFKA_REPLICATION,
        KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID

      },
    };
    break;
  case 'qa':
    dotenv.config({ path: '.env.qa' });
    break;
  default:
    dotenv.config({ path: '.env.dev' });
    break;
}

export const SYS_ERR = {
  NODE_ENV_INVALID: 100,
  BOOTSTRAP_ERROR: 101,
  MONGO_CONN_FAILED: 103,
  REDIS_CONN_FAILED: 104,
};

export default appConfig;
