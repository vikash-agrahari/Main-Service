import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ENUM } from 'src/common/enum';
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
  @IsNumber()
  type: number;
}





export class AdminUpdateProfileDto {
  @ApiPropertyOptional()
  mobileNo?: string;

  @ApiPropertyOptional()
  title?: string;
}


