import { Controller, Get, Param } from '@nestjs/common';
import { UserPracticesService } from './user-practices.service';
import { UserPracticeStatuses } from '#src/core/active-practices/types/user-practice-statuses';

@Controller('users/:userId/practices')
export class UserPracticesController {
  constructor(private readonly activePracticesService: UserPracticesService) {}

  @Get()
  async findAll(@Param('userId') userId: number) {
    return await this.activePracticesService.find({
      where: { user: { id: userId } },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.activePracticesService.findOne({ where: { id } });
  }

  @Get(':id/active')
  async findOneActive(@Param('userId') userId: number) {
    return await this.activePracticesService.findOne({
      where: { user: { id: userId }, status: UserPracticeStatuses.Active },
    });
  }
}
