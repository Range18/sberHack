import { Module } from '@nestjs/common';
import { PracticeDiariesService } from './practice-diaries.service';
import { PracticeDiariesController } from './practice-diaries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticeDiary } from '#src/core/practice-diaries/entities/practice-diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PracticeDiary])],
  controllers: [PracticeDiariesController],
  providers: [PracticeDiariesService],
})
export class PracticeDiariesModule {}
