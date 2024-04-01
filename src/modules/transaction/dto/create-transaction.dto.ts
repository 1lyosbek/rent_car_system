import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { StatusTrack } from "src/common/enums/enum";

export class CreateTransactionDto {
    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    companyId : number;
        
    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    userId : number;
    
    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    carId : number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    price : number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    startKm : number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    endKm : number;
    
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsEnum(StatusTrack)
    statusTrack : string;
}
