import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WebhookDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  data: string;

  

}
