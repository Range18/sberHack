import { Controller, Get, Param } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Directions')
@Controller('directions')
export class DirectionsController {
  constructor(private readonly directionsService: DirectionsService) {}

  @Get()
  async findAll() {
    return await this.directionsService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.directionsService.findOne({
      where: { id },
    });
  }
}
