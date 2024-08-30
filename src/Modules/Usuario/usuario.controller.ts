/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuariosService } from './usuario.service';
import { UsuarioDTOS, valoresDTOS } from './DTOS/usuario.dtos';


@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuariosService) {}

  
@Post('cadastrar')
async create(@Body() data : UsuarioDTOS){
    return this.usuarioService.createUsuario(data)
}
@Get('listar')
async read(){
  return this.usuarioService.listerUsuario();
}
@Get ('imoveis100')
async read_imoveis_valores(@Body() data : valoresDTOS){
    return this.usuarioService.listerImoveisValores(data)
}
@Get ('imoveisDisponivies')
async read_imoveis_disponiveis(){
  return this.usuarioService.listarImoviesDisponiveis()
}
}