import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HttpResponse } from 'src/common/httpResponse';
import { WebhookService } from './webhook.service';
import { AuthGuard } from '@nestjs/passport';
import { WebhookDto } from './dto/webhook.dto';


@ApiTags('Webhook : Subscription')
@Controller('/')
export class WebhookController {
  constructor(
    private readonly httpResponse: HttpResponse,
    private readonly webhookService: WebhookService,
  ) { }

  /**
    * @author TAP
    * @description This function will be used to handel webhook.
    */
  @Post('/')
  @ApiOperation({ summary: 'webhook' })
  async webhook(
    @Body() eventData: any,
    @Res() response: any,
  ) {
    try {
      const [status, result] = await this.webhookService.webhook(eventData);
      return this.httpResponse.sendResponse(response, status, result);
    } catch (error) {
      throw error;
    } 

  }
}
