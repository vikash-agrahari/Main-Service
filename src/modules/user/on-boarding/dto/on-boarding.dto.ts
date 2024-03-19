import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { ENUM } from 'src/common/enum';
import { VALIDATION_MSG } from 'src/common/constant';

export class CreateOnboardingDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  idToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: VALIDATION_MSG.PASSWORD_SHORT,
  })
  @MaxLength(16, {
    message: VALIDATION_MSG.PASSWORD_LONG,
  })
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/, {
    message: VALIDATION_MSG.PASSWORD_FORMAT,
  })
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mobileNo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  countryCode: string;
}

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  idToken: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;
}

export class ResendDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId?: string;
}

export class OtpDto extends ResendDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  otp: string;
}

export class ForgotPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mobileNo?: string;
}


export class ForgotOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  otp: string;
}


export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: VALIDATION_MSG.PASSWORD_SHORT,
  })
  @MaxLength(16, {
    message: VALIDATION_MSG.PASSWORD_LONG,
  })
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/, {
    message: VALIDATION_MSG.PASSWORD_FORMAT,
  })
  password: string;
}