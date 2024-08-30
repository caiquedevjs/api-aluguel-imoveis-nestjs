
import { Type } from "class-transformer"
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { ImovelDTOS } from "src/Modules/Imovel/DTOS/imovel.dtos"

export class UsuarioDTOS{
    @IsOptional()
    @IsString()
    id? : string
    @IsString()
    name : string
    @IsString()
    mail : string
    @IsString()
    password : string
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ImovelDTOS) // Transforma os objetos no array para o tipo ImovelDTOS
    imoveisLista: Array<ImovelDTOS>;
    

}

export class valoresDTOS{
    @IsNumber()
    valor_inicial : number
    @IsNumber()
    valor_final : number
}