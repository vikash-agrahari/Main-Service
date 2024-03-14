import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import {
  ApiTags,
} from '@nestjs/swagger';
import { HttpResponse } from 'src/common/httpResponse';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('Transaction')
@Controller('/')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService,private readonly httpResponse: HttpResponse) {}

  

 
}
