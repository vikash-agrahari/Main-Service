import { Body, Controller, Get, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { HttpResponse } from 'src/common/httpResponse';
import { RESPONSE_DATA } from 'src/common/responses';
import { JwtAdminAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserManagementService } from './user-management.service';
import { UserListingDto } from './dto/create-user-management.dto';

@ApiTags('Admin : Client Management')
@Controller('/')
export class UserManagementController {
  constructor(
    private readonly userManagementService: UserManagementService,
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
  async clientListing(@Query() userListingDto: UserListingDto, @Res() res: Response) {
    const clientListingData = await this.userManagementService.clientListing(userListingDto);
    return this.httpResponse.sendResponse(res, RESPONSE_DATA.SUCCESS, clientListingData);
  }


}
