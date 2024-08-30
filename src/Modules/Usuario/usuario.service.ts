/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsuarioDTOS, valoresDTOS } from './DTOS/usuario.dtos';
import { PrismaService } from 'src/prisma.service';
import { imovelService } from '../Imovel/imovel.service';

@Injectable()
export class UsuariosService {
  // eslint-disable-next-line prettier/prettier
    constructor( private PrismaService : PrismaService){}
    async createUsuario(data : UsuarioDTOS){
    
       const usuarioFind =  await this.PrismaService.usuario.findFirst({
        where : {
            mail : data.mail
        }
      });
      if(usuarioFind){
        throw new Error("Esse mail já está cadastrado!")
      }
      try{
        const usuarioCreate = await this.PrismaService.usuario.create({
            
                data
        });
        return usuarioCreate;
      }
      catch(error){
        console.error('error', error)
      }
        
    

    };
    async listerUsuario(){
      const listerUsarios = await this.PrismaService.usuario.findMany();
      return listerUsarios;
    }
    
    async listerImoveisValores(data: valoresDTOS) {
      const listarImoveis = await this.PrismaService.imovel.findMany({
        where: {
          value: {
            gte: data.valor_inicial,
            lte: data.valor_final,
          },
        },
        select: {
          id: true,
          type: true,
          description: true,
          room: true,
          garage: true,
          service_area: true,
          availability: true,
          value: true,
          bar_code: true,
        },
      });
  
      if (listarImoveis.length === 0) {
        throw new Error("Não há imóveis com esses valores");
      }
  
      return listarImoveis;
    }
    
     async listarImoviesDisponiveis(){
      try{
      const imovelAvailability= await this.PrismaService.imovel.findMany({
        where :{
          availability : true
        },
        select: {
          id: true,
          type: true,
          description: true,
          room: true,
          garage: true,
          service_area: true,
          availability: true,
          value: true,
          bar_code: true,
        },
      }
    );
      if(imovelAvailability.length ===0){
        console.error("Não imoveis disponiveis!")
      }
      return imovelAvailability;
        
      }
      catch(error){
        console.error(error)

        
     };
     }
     
  
};