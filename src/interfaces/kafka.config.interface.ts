import appConfig from "config/configuration";
export const KAFKA_CONFIG = {
    TOPICS: {
        KAFKA_EVENTS: {
            topic: appConfig.env.KAFKA_TOPIC_PRODUCER ||"",
            numPartitions: appConfig.env.KAFKA_PARTITION,
            replicationFactor: appConfig.env.KAFKA_REPLICATION,
        },
    },
};
export const Config = {
    KAFKA_HOST_1: appConfig.env.KAFKA_HOST,
    KAFKA_PORT_1: appConfig.env.KAFKA_PORT, 
};
