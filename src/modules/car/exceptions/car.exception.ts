import { HttpException, HttpStatus } from '@nestjs/common';

export class CarNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Car with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
