import { Body, Controller, Get, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { HttpResponse } from 'src/common/httpResponse';
import { RESPONSE_DATA } from 'src/common/responses';
import { JwtAdminAuthGuard } from 'src/guards/jwt-auth.guard';
import { OrderManagementService } from './order-management.service';
import { OrderListingDto } from './dto/order-management.dto';

@ApiTags('Admin : Order Management')
@Controller('/')
export class OrderManagementController {
  constructor(
    private readonly orderManagementService: OrderManagementService,
    private readonly httpResponse: HttpResponse,
  ) { }

  /**
   * @author Appinventiv
   * @Description  API for order List
   * @param res
   * @returns
   */
  @UseGuards(JwtAdminAuthGuard)
  @ApiBearerAuth()
  @Get('/list')
  @ApiOperation({ summary: 'API to list order' })
  async orderListing(@Query() orderListingDto: OrderListingDto, @Res() res: Response) {
    const orderListingData = await this.orderManagementService.orderListing(orderListingDto);
    return this.httpResponse.sendResponse(res, RESPONSE_DATA.SUCCESS, orderListingData);
  }


}
