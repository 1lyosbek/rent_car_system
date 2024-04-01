import { HttpException, HttpStatus } from '@nestjs/common';

export class PhoneExistException extends HttpException {
  constructor() {
    super('This phone number was already used', HttpStatus.BAD_REQUEST);
  }
}

export class PhoneIsWrongException extends HttpException {
  constructor() {
    super('Phone number is wrong', HttpStatus.BAD_REQUEST);
  }
}

