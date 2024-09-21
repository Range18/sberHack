import { Module } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { DirectionsController } from './directions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Direction } from '#src/core/directions/entities/direction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Direction])],
  controllers: [DirectionsController],
  providers: [DirectionsService],
})
export class DirectionsModule {}
