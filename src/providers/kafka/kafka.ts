import { ConfigService } from '@nestjs/config';
import { Kafka, Admin, KafkaConfig, ITopicConfig } from 'kafkajs';
import { KAFKA_CONFIG } from 'src/interfaces/kafka.config.interface';

export class KafkaManager {
  protected kafka: Kafka;
  private admin: Admin;
  private readonly config: ConfigService
  constructor(  
    ) {
    this.kafka = new Kafka(this.getConfiguration());

    this.admin = this.kafka.admin();
  }

  /**
   * @description Fetch Configuration for Kafka
   * @returns {KafkaConfig}
   */
  getConfiguration(): KafkaConfig {
    const kafkaHost="localhost";
    const kafkaPort=9092;

    const broker = `${kafkaHost}:${kafkaPort}`;

    const creds: KafkaConfig = {
      clientId: 'KAFKA_CLIENT_ID',
      brokers: [broker],
      retry: {},
    };

    return creds;
  }
  /**
   * @description Create the topic if it has not been already created.
   */
  async createTopics() {
    try {
      const topicConfig: {
        topics: ITopicConfig[];
      } = {
        topics: Object.values(KAFKA_CONFIG.TOPICS).map((topic) => ({
          topic: topic.topic || '',
          numPartitions: Number(topic.numPartitions),
          replicationFactor: Number(topic.replicationFactor),
        })),
      };
      console.log('Creating', topicConfig);
      const res = await this.admin.createTopics(topicConfig);
      console.log('Kafka Topic Creation ::', res);
    } catch (error) {
      console.error('Kafka Error Topic Creation', error);
    }
  }

  /**
   * @description Read Metadata for Created Topics
   */
  async metadataOfTopics() {
    try {
      const metadata = await this.admin.fetchTopicMetadata();
      console.log('Kafka Topics Metadata ::', JSON.stringify(metadata));
    } catch (error) {
      console.error('Kafka Error Fetching Metadata', error);
    }
  }

  /**
   * @description Open Connection
   */
  async connectToAdmin() {
    try {
      await this.admin.connect();
      console.log('connection successfully');
    } catch (error) {
      console.log('inside catch-------------------->');
      console.error('Failed to connect to Kafka.', error);
    }
  }

  /**
   * @description Close Connection
   */
  async disconnectFromAdmin() {
    await this.admin.disconnect();
  }
}

//export const KafkaService = new KafkaManager();
