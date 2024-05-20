/* eslint-disable prettier/prettier */
import { IsBoolean, IsNumber, IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class ImovelDTOS{
    @IsString()
    id? : string;
    @IsString()
    type : string;
    @IsString()
    description : string;
    @IsNumber()
    room : number;
    @IsNumber()
    garage : number;
    @IsNumber()
    service_area : number;
    @IsBoolean()
    availability : boolean;
    @IsNumber()
    value : number;
    @IsString()
    bar_code : string;
}