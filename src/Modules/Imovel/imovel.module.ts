/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { imoveisController } from './imovel.controller';
import { imovelService } from './imovel.service';
import { PrismaService } from 'src/prisma.service';


@Module({
  controllers: [imoveisController],
  providers: [imovelService, PrismaService],
})
export class ImoveisModule {}