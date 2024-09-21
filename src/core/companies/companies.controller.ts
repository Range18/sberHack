import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';
import { User } from '#src/common/decorators/User.decorator';
import type { UserRequest } from '#src/common/types/user-request.type';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @AuthGuard()
  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @User() user: UserRequest,
  ) {
    return await this.companiesService.save({
      ...createCompanyDto,
      user: { id: user.id },
    });
  }

  @Get()
  async findAll() {
    return await this.companiesService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.companiesService.findOne({ where: { id } });
  }

  @Get('/count')
  async count() {
    return await this.companiesService.count();
  }

  @AuthGuard()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companiesService.updateOne(
      { where: { id } },
      updateCompanyDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.companiesService.remove({ where: { id } });
  }
}
