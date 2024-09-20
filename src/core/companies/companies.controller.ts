import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companiesService.save(createCompanyDto);
  }

  @Get()
  async findAll() {
    return await this.companiesService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.companiesService.findOne({ where: { id } });
  }

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
