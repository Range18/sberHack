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
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';
import { User } from '#src/common/decorators/User.decorator';
import type { UserRequest } from '#src/common/types/user-request.type';
import { UserService } from '#src/core/users/user.service';

@ApiTags('Practices')
@Controller('practices')
export class PracticesController {
  constructor(
    private readonly practicesService: PracticesService,
    private readonly userService: UserService,
  ) {}

  @AuthGuard()
  @Post()
  async create(
    @Body() createPracticeDto: CreatePracticeDto,
    @User() user: UserRequest,
  ) {
    const userEntity = await this.userService.findOne(
      { where: { id: user.id } },
      true,
    );

    return await this.practicesService.save({
      ...createPracticeDto,
      direction: { id: createPracticeDto.directionId },
      company: { id: userEntity?.company?.id },
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

  @Get('/count')
  async count() {
    return await this.practicesService.count();
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
