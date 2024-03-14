import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HttpResponse } from 'src/common/httpResponse';
import { ClientOnBoardingService } from './on-boarding.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOnboardingDto, LoginDto } from './dto/on-boarding.dto';
import { UserSession } from './interfaces/on-boarding.interface';
import { JwtClientAuthGuard } from 'src/guards/jwt-auth.guard';


@ApiTags('Client : OnBoarding')
@Controller('/')
export class ClientOnBoardingController {
  constructor(
    private readonly httpResponse: HttpResponse,
    private readonly clientOnBoardingService: ClientOnBoardingService,
  ) { }


/**
   * @author Tap 
   * @description signup for client
   * @Body {CreateOnboardingDto}
   */
  @Post('/signup')
  @ApiOperation({ summary: 'sign api' })
  @ApiBasicAuth()
  @UseGuards(AuthGuard('basic'))
  async signup(
    @Body() createOnboardingDto: CreateOnboardingDto,
    @Res() response: any,
  ) {
    try {
      const [status, result] = await this.clientOnBoardingService.signUp(createOnboardingDto);
      return this.httpResponse.sendResponse(response, status, result);
    } catch (error) {
      throw error;
    }

  }

  /**
   * @author Tap 
   * @description login for client
   * @Body {loginDto}
   */

  @Post('/login')
  @ApiOperation({ summary: 'Login api' })
  @ApiBasicAuth()
  @UseGuards(AuthGuard('basic'))
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const [status, result] = await this.clientOnBoardingService.login(loginDto);
    return this.httpResponse.sendResponse(response, status, result);
  }

   /**
   * @author TAP
   * @description This function will be used to get user profile details for client and vendor.
   */

   @Get('/')
   @ApiOperation({ summary: 'User profile request API' })
   @ApiBearerAuth()
   @UseGuards(JwtClientAuthGuard)
   async profileDetails(@Req() req: Request, @Res() response: Response) {
     const sessionData = req.user as UserSession;
     const [status, result] = await this.clientOnBoardingService.profileDetails(sessionData);
     return this.httpResponse.sendResponse(response, status, result);
   }

    /**
   * @author TAP
   * @description This function will be used to get user profile details for client and vendor.
   */

    @Get('/cardList')
    @ApiOperation({ summary: 'Card list request API' })
    @ApiBearerAuth()
    @UseGuards(JwtClientAuthGuard)
    async cardList(@Req() req: Request, @Res() response: Response) {
      const sessionData = req.user as UserSession;
      const [status, result] = await this.clientOnBoardingService.getUserSavedCard(sessionData);
      return this.httpResponse.sendResponse(response, status, result);
    }
}
