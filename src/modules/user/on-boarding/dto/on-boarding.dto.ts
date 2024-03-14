import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOnboardingDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Transform((param) => param.value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  mobileNo: string;

}

export class LoginDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  mobileNo?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
