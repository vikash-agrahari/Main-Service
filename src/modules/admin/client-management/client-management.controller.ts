import { Body, Controller, Get, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { HttpResponse } from 'src/common/httpResponse';
import { RESPONSE_DATA } from 'src/common/responses';
import { JwtAdminAuthGuard } from 'src/guards/jwt-auth.guard';
import { ClientManagementService } from './client-management.service';
import { ClientListingDto } from './dto/create-client-management.dto';

@ApiTags('Admin : Client Management')
@Controller('/')
export class ClientManagementController {
  constructor(
    private readonly clientManagementService: ClientManagementService,
    private readonly httpResponse: HttpResponse,
  ) {}

  /**
   * @Description  API for client List
   * @param res
   * @returns
   */
  @UseGuards(JwtAdminAuthGuard)
  @ApiBearerAuth()
  @Get('/list')
  @ApiOperation({ summary: 'API to list client' })
  async clientListing(@Query() clientListingDto: ClientListingDto, @Res() res: Response) {
    const clientListingData = await this.clientManagementService.clientListing(clientListingDto);
    return this.httpResponse.sendResponse(res, RESPONSE_DATA.SUCCESS, clientListingData);
  }


}
