import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {  IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserListingDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
}



export class BasicUserDetailsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}

