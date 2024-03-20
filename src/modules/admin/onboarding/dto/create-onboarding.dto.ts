import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ENUM } from 'src/common/enum';
import { VALIDATION_MSG } from 'src/common/validationMessage';
export class AdminCreateOnboardingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @Transform((param) => param.value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsNumber()
  mobileNo: number;

  @ApiPropertyOptional()
  profilePic: string;
}
export class AdminLoginDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @Transform((param) => param.value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AdminCheckUserDto {
  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  mobileNo?: number;
}

export class AdminOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  otp: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  adminId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;

}

export class AdminUpdateProfileDto {
  @ApiPropertyOptional()
  mobileNo?: string;

  @ApiPropertyOptional()
  name?: string;
}

export class AdminForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  // mobile_no: number;
}

export class AdminResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  adminId: string;

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

export class AdminChangePasswordDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  adminId: string;

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

