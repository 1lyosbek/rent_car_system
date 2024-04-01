import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";

export class CreateFileDto {
    @ApiPropertyOptional({
        type: Number
    })
    @IsInt()
    @IsOptional()
    carId: number;
}
