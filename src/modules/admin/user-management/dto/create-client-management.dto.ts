import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ENUM } from 'src/common/enum';

export class ClientListingDto {
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



export class BasicClientDetailsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  clientId: string;
}

