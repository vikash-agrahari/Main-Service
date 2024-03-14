import { BadRequestException, Body, Controller, Get, Headers, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CONSTANT} from 'src/common/constant';
import { ENUM } from 'src/common/enum';
import { HttpResponse } from 'src/common/httpResponse';
import { RESPONSE_DATA, RESPONSE_MSG } from 'src/common/responses';
import { AdminEntity } from 'src/entity/admin.entity';
import { AdminSessionEntity } from 'src/entity/adminSession.entity';
import { GuardService } from 'src/guards/guards.service';
import { JwtAdminAuthGuard } from 'src/guards/jwt-auth.guard';
import {
  AdminCreateOnboardingDto,
  AdminLoginDto,
  AdminUpdateProfileDto,
} from './dto/create-onboarding.dto';
import { CreateAdminSession, SessionAdmin } from './interface/onboarding.interface';
import { OnboardingService } from './onboarding.service';

@ApiTags('Admin : OnBoarding')
@Controller('/')
export class OnboardingController {
  constructor(
    private readonly httpResponse: HttpResponse,
    private readonly guardService: GuardService,
    private readonly adminEntity: AdminEntity,
    private readonly adminSessionEntity: AdminSessionEntity,
    private readonly configService: ConfigService,
    private readonly onboardingService: OnboardingService,
  ) {}

  /**
   * @author TAP
   * @description This function will used to add new admin
   * @Body createOnboardingDto
   */

  @Post('/create')
  @ApiOperation({ summary: ' add new api' })
  async create(@Body() adminCreateOnboardingDto: AdminCreateOnboardingDto, @Res() response: Response) {
    adminCreateOnboardingDto.email = adminCreateOnboardingDto.email.toLowerCase();
    adminCreateOnboardingDto.password = this.guardService.hashData(adminCreateOnboardingDto.password, CONSTANT.PASSWORD_HASH_SALT);
    await this.adminEntity.create(adminCreateOnboardingDto);
    return this.httpResponse.sendResponse(response, RESPONSE_DATA.SUCCESS);
  }

  /**
   * @author TAP
   * @description This function will be used for Admin login request API
   * @Body loginDto
   */

  @Post('/login')
  @ApiOperation({ summary: 'Admin login request API' })
  @ApiBasicAuth()
  @UseGuards(AuthGuard('basic'))
  async login(@Body() adminLoginDto: AdminLoginDto, @Res() response: Response) {
    const [status, result] = await this.onboardingService.login(adminLoginDto);
    return this.httpResponse.sendResponse(response, status, result);
  }

  /**
   * @Description This function will used for Admin get profile request API
   * @param req
   * @param res
   * @returns
   */
  @Get('/profile')
  @ApiOperation({ summary: 'Admin get profile request API' })
  @ApiBearerAuth()
  @UseGuards(JwtAdminAuthGuard)
  async profileDetails(@Req() req: Request, @Res() res: Response) {
    const tokenData: SessionAdmin = req.user as SessionAdmin;
    const adminData = await this.adminEntity.getUserDetails({ _id: tokenData.adminId }, { _id: 1, email: 1, name: 1, mobileNo: 1 });
    return this.httpResponse.sendResponse(res, RESPONSE_DATA.PROFILE, adminData);
  }

  /**
   * @Description This function will used for Admin update profile request API
   * @param req
   * @param res
   * @returns
   */
  @Put('/profile')
  @ApiOperation({ summary: 'Admin update profile request API' })
  @ApiBearerAuth()
  @UseGuards(JwtAdminAuthGuard)
  async profileUpdate(@Body() adminUpdateProfileDto: AdminUpdateProfileDto, @Req() req: Request, @Res() res: Response) {
    const tokenData: SessionAdmin = req.user as SessionAdmin;
    if (adminUpdateProfileDto.title) await this.adminEntity.updateAdminDetails(tokenData.adminId, adminUpdateProfileDto);
    return this.httpResponse.sendResponse(res, RESPONSE_DATA.PROFILE, {});
  }

  

  

  
}
