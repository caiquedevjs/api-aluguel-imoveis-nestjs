
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ImovelDTOS } from "../DTOS/imovel.dtos";


@Injectable()
export class imovelService{
    constructor( private  prismaService : PrismaService){}

    async createImovel(data: ImovelDTOS) {
        const imovelFind = await this.prismaService.imovel.findFirst({
            where  : {
                bar_code : data.bar_code
            }
        })
        if(imovelFind){
             throw new Error("Esse imovel já está cadastrado no banco de dados!");
        }
            try {
                const imovel = await this.prismaService.imovel.create({
                    
                          data
                  });
                  return imovel;
            } catch(error){
                console.error('error', error)
            }
           
        
        
      }
    
      // regra de negocio para listar todos os imoveis cadastrados no banco de dados
      async findAllImoveis(){
        return  this.prismaService.imovel.findMany();
    
      
      }
      // regra de negocio para atualizar o imovel  pelo id no banco de dados 
      async updateImovel(id : string, data : ImovelDTOS){
        const imovelUpdate = await this.prismaService.imovel.findUnique({
          where: {
            id,
          }
        });
        if(!imovelUpdate){
          throw new Error("esse id não consta no banco de dados!")
        }
        else{
         return await this.prismaService.imovel.update({
            data,
            where :{
              id,
            }
            
          })
        };
    
      };
    
      // regra de negocio para atualizar o imovel 
      async deleteImovel(id : string){
        const imovelDelete = await this.prismaService.imovel.findUnique({
          where : {
            id,
          }
        });
        if( !imovelDelete){
          throw new Error("esse id não consta no banco de dados!")
        }
        try{
          return await this.prismaService.imovel.delete({
            where : {
              id,
            }
          })
        }
        catch(error){
            console.error('error', error)
        }
      }

}