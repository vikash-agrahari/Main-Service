import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpResponse } from 'src/common/httpResponse';
import { EntityModule } from 'src/entity/entity.module';
import { GuardModule } from 'src/guards/guards.module';
import { GuardService } from 'src/guards/guards.service';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [ConfigModule.forRoot(), EntityModule, GuardModule,  MailerModule.forRootAsync({
    useFactory: (config: ConfigService) => ({
      transport: {
        host: config.get<string>('HOST'),
        secure:false,
        port:25,
        auth: {
          user: config.get<string>('EMAIL') ,
          pass: config.get<string>('PASSWORD'),
        },
        tls: {
          rejectUnauthorized: false
      }
      },
    }),
    inject: [ConfigService],
  }),],
  controllers: [OnboardingController],
  providers: [OnboardingService, HttpResponse, GuardService],
})
export class OnboardingModule {}
