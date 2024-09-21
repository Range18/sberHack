import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PracticeRequestsService } from './practice-requests.service';
import { CreatePracticeRequestDto } from './dto/create-practice-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { PracticeRequestStatuses } from '#src/core/practice-requests/types/practice-request-statuses';
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';
import { User } from '#src/common/decorators/User.decorator';
import type { UserRequest } from '#src/common/types/user-request.type';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { PracticeRequestsCountQuery } from '#src/core/practice-requests/dto/practice-requests-count.query';
import { UserPracticesService } from '#src/core/active-practices/user-practices.service';
import RequestExceptions = AllExceptions.RequestExceptions;

@ApiTags('Practise requests')
@Controller()
export class PracticeRequestsController {
  constructor(
    private readonly practiceRequestsService: PracticeRequestsService,
    private readonly userPracticesService: UserPracticesService,
  ) {}

  @AuthGuard()
  @Post('practices/:practiceId/practice-requests')
  async create(
    @Body() createPracticeRequestDto: CreatePracticeRequestDto,
    @User() user: UserRequest,
    @Param('practiceId') practiceId: number,
  ) {
    const request = await this.practiceRequestsService.findOne({
      where: { practice: { id: practiceId }, user: { id: user.id } },
    });

    if (request) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'RequestExceptions',
        RequestExceptions.Already,
      );
    }

    return await this.practiceRequestsService.save({
      ...createPracticeRequestDto,
      practice: { id: practiceId },
      user: { id: user.id },
    });
  }

  @Get('practice-requests/:id')
  async findOne(@Param('id') id: number) {
    return await this.practiceRequestsService.findOne({
      where: { id },
    });
  }

  @Get('practices/:practiceId/practice-requests')
  async findPracticeRequests(@Param('practiceId') practiceId: number) {
    return await this.practiceRequestsService.find({
      where: { practice: { id: practiceId } },
      order: { status: 'DESC' },
    });
  }

  @Patch('practice-requests/:id/accept')
  async acceptOne(@Param('id') id: number) {
    const request = await this.practiceRequestsService.findOne(
      {
        where: { id },
      },
      true,
    );

    await this.userPracticesService.save({
      practice: { id: request.practice.id },
      user: { id: request.user.id },
    });

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

  @Get('/count')
  async count(@Query() query: PracticeRequestsCountQuery) {
    return await this.practiceRequestsService.count({
      where: { status: query.status },
    });
  }

  @Delete('practice-requests/:id')
  async remove(@Param('id') id: number) {
    return await this.practiceRequestsService.remove({ where: { id } });
  }
}
