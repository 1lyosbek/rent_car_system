import { ApiProperty } from '@nestjs/swagger';
import { IS_JSON, IsInt, IsJSON, IsNotEmpty, IsString } from "class-validator";

export class CreateCarDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  model_id: number;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  company_id: number;

  @ApiProperty({
    type: JSON,
    example: '{"address": "123 Main Street"}',
  })
  @IsJSON()
  info: JSON;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  price: number;
}
