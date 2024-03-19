import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from 'nestjs-twilio';
import { ENUM } from '../../common/enum';
@Injectable()
export class TwilioCommService {
  public constructor(
    private readonly twilioService: TwilioService,
    private readonly configService: ConfigService,
  ) {}

  async sendOtp(message: string, receiver: string): Promise<any> {
    return new Promise((resolve) => {
      try {
        if (
          this.configService.get('ENV') !== ENUM.ENVIRONMENT.PRODUCTION &&
          this.configService.get('ENV') !== ENUM.ENVIRONMENT.PRE_PROD
        ) {
          resolve({
            code: 'queued',
          });
        } else {
          //const senderNumber = this.configService.get('TWILIO_PHONE_NO');
          const messagingServiceSid = this.configService.get<string>(
            'TWILIO_MESSAGING_SID',
          );
          const smsPayload = {
            body: message,
            //from: senderNumber,
            messagingServiceSid: messagingServiceSid,
            to: receiver,
          };
          this.twilioService.client.messages
            .create(smsPayload)
            .then((data) => {
              console.info('SMS SUCCESS', data);
              resolve({ code: data.status, body: data.body });
            })
            .catch((err) => {
              console.error('SMS ERROR', err);
              resolve({ code: err.code, body: err.message });
            });
        }
      } catch (error) {
        console.error('[sendOtp]', error);
        resolve({ code: 'error', body: error.message });
      }
    });
  }

  async sendOtpAdmin(message: string, receiver: string): Promise<any> {
    return new Promise((resolve) => {
      try {
        if (
          this.configService.get('ENV') !== ENUM.ENVIRONMENT.PRODUCTION &&
          this.configService.get('ENV') !== ENUM.ENVIRONMENT.PRE_PROD
        ) {
          resolve({
            code: 'queued',
          });
        } else {
          //const senderNumber = this.configService.get('TWILIO_PHONE_NO');
          const messagingServiceSid = this.configService.get<string>(
            'TWILIO_MESSAGING_SID',
          );
          const smsPayload = {
            body: `Admin: ${message}`,
            // from: senderNumber,
            messagingServiceSid: messagingServiceSid,
            to: receiver,
          };
          this.twilioService.client.messages
            .create(smsPayload)
            .then((data) => {
              console.info('SMS SUCCESS', data);
              resolve({ code: data.status, body: data.body });
            })
            .catch((err) => {
              console.error('SMS ERROR', err);
              resolve({ code: err.code, body: err.message });
            });
        }
      } catch (error) {
        console.error('[sendOtp]', error);
        resolve({ code: 'error', body: error.message });
      }
    });
  }

  async validateMobileNumber(phoneNumber: string) {
    return new Promise((resolve) => {
      if (
        this.configService.get('ENV') !== ENUM.ENVIRONMENT.PRODUCTION &&
        this.configService.get('ENV') !== ENUM.ENVIRONMENT.PRE_PROD
      ) {
        resolve(phoneNumber);
      } else {
        this.twilioService.client.lookups.v1
          .phoneNumbers(phoneNumber)
          .fetch({ countryCode: 'US' })
          .then((phone_number) => {
            console.log(phone_number.nationalFormat);
            resolve(phone_number);
          })
          .catch((err: any) => {
            console.log('[validate Mobile Number]', err);
            resolve(err);
          });
      }
    });
  }
}
