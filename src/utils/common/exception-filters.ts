import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.debug(
      exception.stack,
      ':::::: this log is in exception-filter.ts ',
    );

    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    /**
     * Catch the all INTERNAL_SERVER_ERRORS
     */
    let statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string =
      exception instanceof HttpException
        ? this.extractMessage(exception.getResponse())
        : ['Unable to process your request,Please try again later'];

    // Initialize an optional errors object
    let errors: any = null;

    // Handle DTO Validation Error specifically
    if (
      statusCode === HttpStatus.BAD_REQUEST &&
      exception.response &&
      exception.response.message &&
      Array.isArray(exception.response.message)
    ) {
      errors = exception.response.message.reduce((acc, error) => {
        acc[error.property] = Object.values(error.constraints)[0];
        return acc;
      }, {});

      // Change the message for validation errors
      message = 'Validation failed';
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY; // Set status to 422 for validation errors
    }

    // Response structure adjustment to include errors if present
    const responseBody: any = {
      message,
      statusCode,
    };

    if (errors) {
      responseBody.message.errors = errors;
    }

    response.status(statusCode).json(responseBody);
  }

  private extractMessage(response: any): any {
    if (typeof response === 'string') {
      return [response]; // Wrap the string message in an array
    }
    if (response.message && typeof response.message === 'string') {
      return [response.message]; // Wrap the string message in an array
    }
    if (Array.isArray(response.message)) {
      return response.message; // Already an array, return as is
    }

    if (response['status'] == 422) {
      return Object.values(response['errors']); // Wrap error messages in an array
    }
    if (response['status'] == 500) {
      return ['Unable to process your request,Please try again later']; // Return a specific error message for status code 500
    }
    return ['Unable to process your request,Please try again later']; // Default to an array with a generic error message
  }
}
