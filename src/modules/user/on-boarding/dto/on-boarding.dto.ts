import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
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

export class CreateOnboardingDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  idToken: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  password: string;
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
