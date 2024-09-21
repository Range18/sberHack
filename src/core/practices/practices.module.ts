import { Module } from '@nestjs/common';
import { PracticesService } from './practices.service';
import { PracticesController } from './practices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Practices } from '#src/core/practices/entities/practice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Practices])],
  controllers: [PracticesController],
  providers: [PracticesService],
})
export class PracticesModule {}
