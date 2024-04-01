import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from 'src/common/enums/enum';

const newRoleEnum = { ...RoleEnum };
delete newRoleEnum.ADMIN
const withoutAdminRole = JSON.parse(JSON.stringify(newRoleEnum));


export class LoginDto {
  @ApiProperty({
    type: Number,
  })
  @IsInt()
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
    enum: withoutAdminRole,
  })
  @IsEnum(withoutAdminRole)
  @IsNotEmpty()
  role: string;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsInt()
  @IsOptional()
  companyId: number;
}

export class ClientRegisterDto {
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
}
