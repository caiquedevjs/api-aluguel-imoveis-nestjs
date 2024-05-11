/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { imovelService } from './imovel.service';
import { ImovelDTOS } from "./DTOS/imovel.dtos";

@Controller('imoveis')
export class imoveisController {
    constructor( private readonly imoveisService : imovelService){ }


@Post('cadastrar')
async create(@Body() data: ImovelDTOS){
     return  this.imoveisService.createImovel(data);

}

@Get('listar')
async findAll(){
    return this.imoveisService.findAllImoveis();
}

@Put(":id")
async updateAll(@Param("id") id : string, @Body() data : ImovelDTOS){
    return this.imoveisService.updateImovel(id, data);

}

@Delete(":id")
async deleteImovel(@Param("id") id : string){
    return this.imoveisService.deleteImovel(id);
}
}