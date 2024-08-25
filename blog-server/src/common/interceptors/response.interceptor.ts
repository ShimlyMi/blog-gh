import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResultData } from '../utils/result';
import { Request, Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResultData> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    if (
      request.method === 'POST' &&
      response.statusCode === HttpStatus.CREATED
    ) {
      response.status(HttpStatus.OK);
    }

    return next.handle().pipe(
      map((data: ResultData) => {
        return data;
      }),
    );
  }
}
