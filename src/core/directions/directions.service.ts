import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { Direction } from '#src/core/directions/entities/direction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import NotFoundExceptions = AllExceptions.NotFoundExceptions;

@Injectable()
export class DirectionsService extends BaseEntityService<
  Direction,
  'NotFoundExceptions'
> {
  constructor(
    @InjectRepository(Direction)
    private readonly directionRepository: Repository<Direction>,
  ) {
    super(
      directionRepository,
      new ApiException<'NotFoundExceptions'>(
        HttpStatus.NOT_FOUND,
        'NotFoundExceptions',
        NotFoundExceptions.NotFound,
      ),
    );
  }
}
