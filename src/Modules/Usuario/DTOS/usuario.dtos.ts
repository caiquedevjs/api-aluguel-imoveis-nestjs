/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator"

/* eslint-disable prettier/prettier */
export class UsuarioDTOS{
    
    id? : string
    @IsString()
    name : string
    @IsString()
    mail : string
    @IsString()
    password : string
    

}

export class valoresDTOS{
    @IsNumber()
    valor_inicial : number
    @IsNumber()
    valor_final : number
}