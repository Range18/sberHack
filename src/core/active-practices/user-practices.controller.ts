import { Controller, Get, Param } from '@nestjs/common';
import { UserPracticesService } from './user-practices.service';

@Controller('active-practices')
export class UserPracticesController {
  constructor(private readonly activePracticesService: UserPracticesService) {}

  @Get()
  async findAll() {
    return await this.activePracticesService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.activePracticesService.findOne({ where: { id } });
  }
}
