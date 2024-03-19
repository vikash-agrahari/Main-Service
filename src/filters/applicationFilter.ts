import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApplicationError } from 'src/common/applicationError';

@Catch(ApplicationError)
export class ApplicationErrorFilter implements ExceptionFilter {
  catch(exception: ApplicationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { status, message } = exception;
    response.status(status || HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: status || HttpStatus.INTERNAL_SERVER_ERROR,
      message: message || 'Internal server error',
    });
  }
}
