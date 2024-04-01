import { HttpException, HttpStatus } from '@nestjs/common';

export class ModelNotFoundException extends HttpException {
  constructor(model: number) {
    super(`Model ${model} not found`, HttpStatus.NOT_FOUND);
  }
}
