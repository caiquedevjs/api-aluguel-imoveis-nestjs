
import { Injectable } from '@nestjs/common';
import { UsuarioDTOS, valoresDTOS } from '../DTOS/usuario.dtos';
import { PrismaService } from 'src/prisma.service';
import { imovelService } from '../../Imovel/services/imovel.service';
import { ImovelDTOS } from 'src/Modules/Imovel/DTOS/imovel.dtos';

@Injectable()
export class UsuariosService {

    constructor( private PrismaService : PrismaService){}


    async createUsuario(data: UsuarioDTOS) {
      // Verifica se o email já está cadastrado
      const usuarioFind = await this.PrismaService.usuario.findFirst({
        where: {
          mail: data.mail,
        },
      });
  
      if (usuarioFind) {
        throw new Error('Esse mail já está cadastrado!');
      }
  
      try {
        // Transformar DTO para o formato esperado pelo Prisma
        const prismaData = {
          name: data.name,
          mail: data.mail,
          password: data.password,
          // A lista de imoveis é opcional
          imoveisLista: data.imoveisLista ? {
            create: data.imoveisLista.map(imovel => ({
              type: imovel.type,
              description: imovel.description,
              room: imovel.room,
              garage: imovel.garage,
              service_area: imovel.service_area,
              availability: imovel.availability,
              value: imovel.value,
              bar_code: imovel.bar_code,
            })),
          } : undefined,
        };
  
        // Cria o novo usuário e os imóveis associados
        const usuarioCreate = await this.PrismaService.usuario.create({
          data: prismaData,
        });
  
        return usuarioCreate;
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
      }


    }
  

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
    };

    
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
        console.error("Não há imoveis disponiveis!")
      }
      return imovelAvailability; 
      }
      catch(error){
        console.error(error)
     };
     };
     
     async addImovelToUsuario(usuarioId: string, imovelId: string) {
      // Verifica se o usuário existe
      const usuario = await this.PrismaService.usuario.findUnique({
        where: { id: usuarioId },
      });
  
      if (!usuario) {
        throw new Error('Usuário não encontrado.');
      }
  
      // Verifica se o imóvel está disponível e se existe
      const imovel = await this.PrismaService.imovel.findUnique({
        where: { id: imovelId },
      });
  
      if (!imovel) {
        throw new Error('Imóvel não encontrado.');
      }
  
      if (!imovel.availability) {
        throw new Error('Imóvel não está disponível.');
      }
  
      // Associa o imóvel ao usuário
      try {
        const updatedUsuario = await this.PrismaService.usuario.update({
          where: { id: usuarioId },
          data: {
            imoveisLista: {
              connect: { id: imovelId }, // Adiciona o imóvel à lista do usuário
            },
          },
        });
  
        // Marca o imóvel como não disponível
        await this.PrismaService.imovel.update({
          where: { id: imovelId },
          data: { availability: false },
        });
  
        return updatedUsuario;
      } catch (error) {
        console.error('Erro ao associar imóvel ao usuário:', error);
        throw new Error('Erro ao associar imóvel ao usuário');
      }
    }
};