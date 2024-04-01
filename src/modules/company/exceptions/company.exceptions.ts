import { HttpException, HttpStatus } from '@nestjs/common';

export class CompanyNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Company with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
