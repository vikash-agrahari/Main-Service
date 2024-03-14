import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HttpResponse } from 'src/common/httpResponse';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { Request, Response } from 'express';
import { RESPONSE_DATA } from 'src/common/responses';
import { UserSession } from 'src/modules/user/on-boarding/interfaces/on-boarding.interface';
import { JwtUserAuthGuard } from 'src/guards/jwt-auth.guard';



@ApiTags('Order')
@Controller('/')
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly httpResponse: HttpResponse) { }

  /**
  * @author APPINVENTIV
  * @description This function will be used to create default order.
  */
  @Post('createOrder')
  @ApiOperation({ summary: 'create default order' })
  @ApiBearerAuth()
  @UseGuards(JwtUserAuthGuard)
  async createOrder(@Body() orderDto: OrderDto, @Req() req: Request, @Res() response: Response,) {
    try {
      const sessionData = req.user as UserSession;
      const [status, result] = await this.orderService.createOrder(orderDto, sessionData);
      return this.httpResponse.sendResponse(response, status, result);
    } catch (error) {
      return [RESPONSE_DATA.ERROR, {}];
    }
  }


}
