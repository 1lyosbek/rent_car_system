import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from 'src/common/enums/enum';

export class LoginDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  phone: number;
}

export class RegisterDto {
  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  phone: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  avatar: number;

  @ApiProperty({
    enum: RoleEnum,
  })
  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsInt()
  @IsOptional()
  companyId: number;
}
