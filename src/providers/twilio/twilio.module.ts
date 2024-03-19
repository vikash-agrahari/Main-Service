import { Module } from '@nestjs/common';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TwilioCommService } from './twilio.service';
@Module({
  imports: [
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        accountSid: cfg.get('TWILIO_ACCOUNT_SID'),
        authToken: cfg.get('TWILIO_AUTH_TOKEN'),
        username: cfg.get<string>('TWILIO_USERNAME'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TwilioCommService, ConfigService],
  exports: [TwilioCommService],
})
export class TwilioCommModule {}
