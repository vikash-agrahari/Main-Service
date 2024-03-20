import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, ConfirmChannel, Connection, Options } from 'amqplib';
import { ENUM } from 'src/common/enum';

export let channels: any = {};

@Injectable()
export class RabbitMQ implements OnApplicationShutdown {
  private connection: Connection;

  constructor(private readonly configService: ConfigService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onApplicationShutdown(signal?: string | undefined) {
    if (this.connection) await this.connection.close();
  }

  async createConnection() {
    return new Promise<ConfirmChannel[]>(async (resolve, reject) => {
      try {
        const connectionOptions: Options.Connect = {
          hostname: 'localhost',
          port: 5672,
        };
        this.connection = await connect(connectionOptions);

        this.connection.on('error', async (err: any) => {
          console.error('[Rabbit MQ] Error in connection: ' + err.message);
        });

        this.connection.on('close', async (err: any) => {
          console.error('[Rabbit MQ] Connection close:' + err);
          await this.createConnection();
        });

        console.log('[Rabbit MQ] connecting!');

        channels = {};

        for await (const CHANNEL_NAME of Object.keys(ENUM.CHANNEL_TYPE)) {
          const channel = await this.connection.createConfirmChannel();
          console.log(
            `[Rabbit MQ] connecting! Channels connected ${CHANNEL_NAME} ${Object.keys(channels).length + 1}/${Object.keys(ENUM.CHANNEL_TYPE).length}`
          );
          channel.on('error', (err: any) => {
            console.error(`[Rabbit MQ] Error in channel ${CHANNEL_NAME}: ` + err.message);
          });
          await createExchange(channel);
          channels[CHANNEL_NAME] = channel;
        }
        console.log('[Rabbit MQ] connected');
        resolve(channels);
      } catch (error) {
        console.error(`Error connecting rabbitMq ==> ${error}`);
        reject(error);
      }
    });
  }
}
async function createExchange(channel:any) {
  try {
    await channel.assertExchange('demo_queue', 'direct', { durable: false });
    console.log('"demo_queue" created successfully');
  } catch (error) {
    console.error('Error creating exchange:', error.message);
    throw error;
  }
}