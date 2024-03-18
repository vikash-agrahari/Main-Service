import { KAFKA_CONSTANT } from "../common/kafka.constant";
export const KAFKA_CONFIG = {
    TOPICS: {
        KAFKA_EVENTS: {
            topic: KAFKA_CONSTANT.KAFKA_TOPIC_PRODUCER,
            numPartitions: KAFKA_CONSTANT.KAFKA_PARTITION,
            replicationFactor: KAFKA_CONSTANT.KAFKA_REPLICATION,
        },
    },
};

