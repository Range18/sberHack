import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PracticeRequestsService } from './practice-requests.service';
import { CreatePracticeRequestDto } from './dto/create-practice-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { PracticeRequestStatuses } from '#src/core/practice-requests/types/practice-request-statuses';
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';
import { User } from '#src/common/decorators/User.decorator';
import type { UserRequest } from '#src/common/types/user-request.type';

@ApiTags('Practise requests')
@Controller()
export class PracticeRequestsController {
  constructor(
    private readonly practiceRequestsService: PracticeRequestsService,
  ) {}

  @AuthGuard()
  @Post('practices/:practiceId/practice-requests')
  async create(
    @Body() createPracticeRequestDto: CreatePracticeRequestDto,
    @User() user: UserRequest,
    @Param('practiceId') practiceId: number,
  ) {
    return await this.practiceRequestsService.save({
      ...createPracticeRequestDto,
      practice: { id: practiceId },
      user: { id: user.id },
    });
  }

  @Get('practice-requests')
  async findAll() {
    return await this.practiceRequestsService.find({});
  }

  @Get('practice-requests/:id')
  async findOne(@Param('id') id: number) {
    return await this.practiceRequestsService.findOne({
      where: { id },
    });
  }

  @Get('practices/:practiceId/practice-requests')
  async findPracticeRequests(@Param('practiceId') practiceId: number) {
    return await this.practiceRequestsService.findOne({
      where: { practice: { id: practiceId } },
    });
  }

  @Patch('practice-requests/:id/accept')
  async acceptOne(@Param('id') id: number) {
    return await this.practiceRequestsService.updateOne(
      {
        where: { id },
      },
      { status: PracticeRequestStatuses.Accepted },
    );
  }

  @Patch('practice-requests/:id/cancel')
  async cancelOne(@Param('id') id: number) {
    return await this.practiceRequestsService.updateOne(
      {
        where: { id },
      },
      { status: PracticeRequestStatuses.Cancelled },
    );
  }

  @Delete('practice-requests/:id')
  async remove(@Param('id') id: number) {
    return await this.practiceRequestsService.remove({ where: { id } });
  }
}
