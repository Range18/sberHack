import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PracticeRequestsService } from './practice-requests.service';
import { CreatePracticeRequestDto } from './dto/create-practice-request.dto';
import { UpdatePracticeRequestDto } from './dto/update-practice-request.dto';

@Controller('practice-requests')
export class PracticeRequestsController {
  constructor(private readonly practiceRequestsService: PracticeRequestsService) {}

  @Post()
  create(@Body() createPracticeRequestDto: CreatePracticeRequestDto) {
    return this.practiceRequestsService.create(createPracticeRequestDto);
  }

  @Get()
  findAll() {
    return this.practiceRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.practiceRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePracticeRequestDto: UpdatePracticeRequestDto) {
    return this.practiceRequestsService.update(+id, updatePracticeRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.practiceRequestsService.remove(+id);
  }
}
