import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {  IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ENUM } from 'src/common/enum';

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

export class BlockUnblockDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsEnum([ENUM.USER_BLOCK_STATUS.BLOCKED, ENUM.USER_BLOCK_STATUS.ACTIVE])
  blockedStatus: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @ValidateIf((s) => s.blockedStatus === ENUM.USER_BLOCK_STATUS.BLOCKED)
  @IsString()
  blockReason?: string;
}



export class BasicUserDetailsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}

