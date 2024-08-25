import { HttpStatus } from '@nestjs/common';

export class ResultData {
  constructor(
    public code = HttpStatus.OK,
    public message?: string,
    public data?: any,
  ) {
    this.code = code;
    this.message = message || '成功啦~';
    this.data = data || null;
  }

  static messageSuccess(data?: any, message?: string) {
    return new ResultData(HttpStatus.OK, message, data);
  }

  static messageFail(code: number, message: string, data?: any) {
    return new ResultData(code, message, data);
  }
}
