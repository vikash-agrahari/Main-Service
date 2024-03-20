import { Message } from 'kafkajs';
import { IProducer } from 'src/interfaces/kafka.interface';
import { KafkaProducer } from './producer.kafka';
import {CHANNEL_TYPE} from "../../interfaces/common.interface"
import { KAFKA_CONFIG } from 'src/interfaces/kafka.config.interface';
import { ConfigService } from '@nestjs/config';

export class KafkaService {
    private readonly producers = new Map<string, IProducer>();

    /**
     * @description Publish Message to Topic
     * @param {string} topic
     * @param {Message} message
     */
    async produce(topic:string,message: Message) {
        try {
            const configService = new ConfigService();
            // const topic = this.getTopicForChannel(channel);
            const producer = await this.getProducer(topic,configService);
            await producer.produce(message);
            console.log('Kafka Producer Message Published :: ');
        } catch (error) {
            console.log('Kafka Producer Error :: ', error);
        }
    }

      /**
     * @description Maintain a producer for each topic
     * @param {string} topic
     * @returns {IProducer}
     */
      private async getProducer(topic: string, configService: ConfigService<Record<string, unknown>, false>): Promise<IProducer> {
        let producer = this.producers.get(topic);
        if (!producer) {
            producer = new KafkaProducer(topic,configService);
            await producer.connect();
            this.producers.set(topic, producer);
        }
        return producer;
    }

    /**
     * @description Get Kafka topic based on channel type
     * @param {string} channel
     * @returns {string}
     */
    private getTopicForChannel(channel: string): string {
        switch (channel) {
            case CHANNEL_TYPE.PUSH:
                return KAFKA_CONFIG.TOPICS.KAFKA_EVENTS.topic;
            case CHANNEL_TYPE.EMAIL:
                return KAFKA_CONFIG.TOPICS.KAFKA_EVENTS.topic;
            default:
                throw new Error(`Unknown channel: ${channel}`);
        }
    }

}

