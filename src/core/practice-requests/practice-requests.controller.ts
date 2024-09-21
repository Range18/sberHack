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

@ApiTags('Practise requests')
@Controller()
export class PracticeRequestsController {
  constructor(
    private readonly practiceRequestsService: PracticeRequestsService,
  ) {}

  @Post('practice-requests')
  async create(@Body() createPracticeRequestDto: CreatePracticeRequestDto) {
    return await this.practiceRequestsService.save(createPracticeRequestDto);
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
      { isAccepted: true },
    );
  }

  @Delete('practice-requests/:id')
  async remove(@Param('id') id: number) {
    return await this.practiceRequestsService.remove({ where: { id } });
  }
}
