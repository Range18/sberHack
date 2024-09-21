import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { Practices } from '#src/core/practices/entities/practice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import NotFoundExceptions = AllExceptions.NotFoundExceptions;

@Injectable()
export class PracticesService extends BaseEntityService<
  Practices,
  'NotFoundExceptions'
> {
  constructor(
    @InjectRepository(Practices)
    private readonly repository: Repository<Practices>,
  ) {
    super(
      repository,
      new ApiException<'NotFoundExceptions'>(
        HttpStatus.NOT_FOUND,
        'NotFoundExceptions',
        NotFoundExceptions.NotFound,
      ),
    );
  }
}
