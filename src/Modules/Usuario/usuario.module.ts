/* eslint-disable prettier/prettier */

import { PrismaService } from 'src/prisma.service';
import { UsuarioController } from './usuario.controller';
import { Module } from '@nestjs/common';
import { UsuariosService } from './usuario.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuariosService, PrismaService],
})
export class UsuarioModule {}