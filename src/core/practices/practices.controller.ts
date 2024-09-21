import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PracticesService } from './practices.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { ApiTags } from '@nestjs/swagger';
import { PracticeQuery } from '#src/core/practices/dto/practice.query';

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
  async findAll(@Query() query: PracticeQuery) {
    return await this.practicesService.find({
      where: { company: { id: query.companyId } },
      relations: { direction: true, practiceRequests: { user: true } },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.practicesService.findOne({
      where: { id },
      relations: { direction: true, practiceRequests: { user: true } },
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePracticeDto: UpdatePracticeDto,
  ) {
    return await this.practicesService.updateOne(
      {
        where: { id },
        relations: { direction: true, practiceRequests: { user: true } },
      },
      updatePracticeDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.practicesService.remove({ where: { id } });
  }
}
