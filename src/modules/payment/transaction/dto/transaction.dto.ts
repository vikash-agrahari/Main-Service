import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';



export class TransactionDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reciept: string;
}

export class LogDto {
  
  @ApiProperty()
  @IsNotEmpty()
  request: any;

  @ApiProperty()
  @IsNotEmpty()
  response: any;
}
