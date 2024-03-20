import { BadRequestException, Body, Controller, Get, Headers, Next, Param, Post, Put, Query, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NextFunction, Request, Response } from 'express';
import { CONSTANT} from 'src/common/constant';
import { ENUM } from 'src/common/enum';
import { HttpResponse } from 'src/common/httpResponse';
import { RESPONSE_DATA, RESPONSE_MSG } from 'src/common/responses';
import { AdminEntity } from 'src/entity/admin.entity';
import { AdminSessionEntity } from 'src/entity/adminSession.entity';
import { GuardService } from 'src/guards/guards.service';
import { JwtAdminAuthGuard } from 'src/guards/jwt-auth.guard';
import {
  AdminChangePasswordDto,
  AdminCreateOnboardingDto,
  AdminForgotPasswordDto,
  AdminLoginDto,
  AdminOtpDto,
  AdminResetPasswordDto,
  AdminUpdateProfileDto,
} from './dto/create-onboarding.dto';
import { CreateAdminSession, SessionAdmin } from './interface/onboarding.interface';
import { OnboardingService } from './onboarding.service';
import { AllExceptionsFilter } from 'src/filters/exceptionFilter';

@ApiTags('Admin : OnBoarding')
@Controller('/')
export class OnboardingController {
  constructor(
    private readonly httpResponse: HttpResponse,
    private readonly guardService: GuardService,
    private readonly adminEntity: AdminEntity,
    private readonly configService: ConfigService,
    private readonly adminSessionEntity: AdminSessionEntity,
    private readonly onboardingService: OnboardingService,
  ) {}

  /**
   * @author Appinventiv
   * @description This function will used to add new admin
   * @Body createOnboardingDto
   */

  // @Post('/create')
  // @ApiOperation({ summary: ' add new api' })
  // async create(@Body() adminCreateOnboardingDto: AdminCreateOnboardingDto, @Res() response: Response) {
  //   adminCreateOnboardingDto.email = adminCreateOnboardingDto.email.toLowerCase();
  //   adminCreateOnboardingDto.password = this.guardService.hashData(adminCreateOnboardingDto.password, CONSTANT.PASSWORD_HASH_SALT);
  //   await this.adminEntity.create(adminCreateOnboardingDto);
  //   return this.httpResponse.sendResponse(response, RESPONSE_DATA.SUCCESS);
  // }

  /**
   * @author Appinventiv
   * @description This function will be used for Admin login request API
   * @Body loginDto
   */

  @Post('/login')
  @ApiOperation({ summary: 'Admin login request API' })
  @ApiBasicAuth()
  @UseGuards(AuthGuard('basic'))
  async login(@Body() adminLoginDto: AdminLoginDto, @Res() response: Response) {
    try{
      const result= await this.onboardingService.login(adminLoginDto);
      return this.httpResponse.sendResponse(response, RESPONSE_DATA.OTP_SENT,result.otp);
    }
    catch(error){
      console.error("error in login ",error)
    }
  }

  /**
   * @author Appinventiv
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
   * @author Appinventiv
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
    if (adminUpdateProfileDto) await this.adminEntity.updateAdminDetails(tokenData.adminId, adminUpdateProfileDto);
    return this.httpResponse.sendResponse(res, RESPONSE_DATA.PROFILE, {});
  }

  /**
   * @author Appinventiv
   * @Description This function will used for Forgot password api for admin
   * @param req
   * @param res
   * @returns
   */
  @Post('/forgot-password')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('basic'))
  async forgotPassword(@Body() adminForgotPasswordDto: AdminForgotPasswordDto, @Req() req:Request, @Res() res:Response) {
    await this.onboardingService.forgotPassword(adminForgotPasswordDto);
    return this.httpResponse.sendResponse(res, RESPONSE_DATA.SUCCESS,{});
  }  

  /**
   * @author Appinventiv
   * @Description This function will used to verify the otp
   * @param req
   * @param res
   * @returns
   */
  @Post('/otp/verify')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('basic'))
  async otpVerify(@Body() adminOtpDto:AdminOtpDto, @Req() req:Request, @Res() res:Response,@Next() next:NextFunction) {
    try{
      const result=await this.onboardingService.otpVerify(adminOtpDto);
      return this.httpResponse.sendResponse(res,RESPONSE_DATA.SUCCESS,result);
    }
    catch(error){
      throw error;
    }
  }

  /**
   * @author Appinventiv
   * @Description This function will used to reset the password
   */
  @Post('/reset-password')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('basic'))
  async resetPassword(@Body() adminResetPassword:AdminResetPasswordDto, @Req() req:Request, @Res() res:Response) {
    try{
      await this.onboardingService.resetPassword(adminResetPassword);
      return this.httpResponse.sendResponse(res, RESPONSE_DATA.PASSWORD_RESET, {});
    }
    catch(error){
      throw error;
    }  
  }

  /**
   * @author Appinventiv
   * @Description This function will used for Admin logout request API
   * @param req
   * @param res
   * @returns
   */
  @Post('/logout')
  @ApiOperation({ summary: 'Admin logout request API' })
  @ApiBearerAuth()
  @UseGuards(JwtAdminAuthGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
    try{
      const tokenData: SessionAdmin = req.user as SessionAdmin;
      await this.adminSessionEntity.findOneAndUpdate({ adminId: tokenData.adminId },{status:ENUM.USER_PROFILE_STATUS.LOGOUT});
      return this.httpResponse.sendResponse(res, RESPONSE_DATA.LOGOUT, {});
    }
    catch(error){
    }
  }


  /**
   * @author Appinventiv
   * @Description this function will use to change the password of admin
   * @Body AdminChangePasswordDto
   */
  @Post('/change-password')
  @ApiOperation({ summary:'Admin can change the password '})
  @ApiBearerAuth()
  @UseGuards(JwtAdminAuthGuard)
  async changePassword(@Body() adminChangePasswordDto:AdminChangePasswordDto,@Req() req:Request,@Res() res:Response){
    await this.onboardingService.changePasswordService(adminChangePasswordDto);
    return this.httpResponse.sendResponse(res, RESPONSE_DATA.PASSWORD_RESET, {});
  }
  }

