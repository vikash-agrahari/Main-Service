import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class ApplePurchaseDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productId: string;
}

export class OrderDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productId: string;
}

export class SdkOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  transactionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  orderId: string;
}

export class CardOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cardId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  transactionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  orderId: string;
}

export class CreateOrderDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  orderId: string;
}

export class LogDto {
  
  @ApiProperty()
  @IsNotEmpty()
  request: any;

  @ApiProperty()
  @IsNotEmpty()
  response: any;
}
