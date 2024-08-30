/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ImoveisModule } from './Modules/Imovel/module/imovel.module';
import { UsuarioModule } from './Modules/Usuario/module/usuario.module';


@Module({
  imports: [ImoveisModule,UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
