import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const logger = new Logger('HTTP');

@Injectable()
export class RabbitMQProducer {
  QUEUE: any = '';
  constructor(private readonly configService: ConfigService) {
    this.QUEUE = this.configService.get<string>('RABBIT_MQ_QUEUE') ?? 'demo_queue';
  }
}
