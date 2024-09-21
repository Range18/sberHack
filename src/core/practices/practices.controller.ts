import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PracticesService } from './practices.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Practices')
@Controller('practices')
export class PracticesController {
  constructor(private readonly practicesService: PracticesService) {}

  @Post()
  async create(@Body() createPracticeDto: CreatePracticeDto) {
    return await this.practicesService.save({
      ...createPracticeDto,
      direction: { id: createPracticeDto.directionId },
    });
  }

  @Get()
  async findAll() {
    return await this.practicesService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.practicesService.findOne({ where: { id } });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePracticeDto: UpdatePracticeDto,
  ) {
    return await this.practicesService.updateOne(
      { where: { id } },
      updatePracticeDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.practicesService.remove({ where: { id } });
  }
}
