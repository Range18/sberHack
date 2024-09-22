import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PracticeDiariesService } from './practice-diaries.service';
import { CreatePracticeDiaryDto } from './dto/create-practice-diary.dto';

@Controller('practice-diaries')
export class PracticeDiariesController {
  constructor(
    private readonly practiceDiariesService: PracticeDiariesService,
  ) {}

  @Post()
  async create(@Body() createPracticeDiaryDto: CreatePracticeDiaryDto) {
    return await this.practiceDiariesService.save(createPracticeDiaryDto);
  }

  @Get()
  async findAll() {
    return await this.practiceDiariesService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.practiceDiariesService.findOne({ where: { id } });
  }
}
