import { Body, Controller, Get, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { HttpResponse } from 'src/common/httpResponse';
import { RESPONSE_DATA } from 'src/common/responses';
import { JwtAdminAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserManagementService } from './user-management.service';
import { BlockUnblockDto, UserListingDto } from './dto/create-user-management.dto';
import { SessionAdmin } from '../onboarding/interface/onboarding.interface';

@ApiTags('Admin : User Management')
@Controller('/')
export class UserManagementController {
  constructor(
    private readonly userManagementService: UserManagementService,
    private readonly httpResponse: HttpResponse,
  ) {}

  /**
   * @Description  API for user List
   * @param res
   * @returns
   */
  @UseGuards(JwtAdminAuthGuard)
  @ApiBearerAuth()
  @Get('/list')
  @ApiOperation({ summary: 'API to list user' })
  async clientListing(@Query() userListingDto: UserListingDto, @Res() res: Response) {
    const clientListingData = await this.userManagementService.userListing(userListingDto);
    return this.httpResponse.sendResponse(res, RESPONSE_DATA.SUCCESS, clientListingData);
  }

  /**
   * @Description Api for block the user and unblocked the user
   * @Param req
   * @param res
   * @returns
   */
  @UseGuards(JwtAdminAuthGuard)
  @ApiBearerAuth()
  @Post('/Block')
  @ApiOperation({ summary: 'API to list user' })
  async blockUnblock(@Body() blockUnblockDto: BlockUnblockDto, @Req() req: Request, @Res() res: Response) {
    const result = await this.userManagementService.blockUnblockService(blockUnblockDto);
    return this.httpResponse.sendResponse(res,RESPONSE_DATA.SUCCESS,result);
  }
}
