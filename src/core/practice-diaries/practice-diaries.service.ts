import { HttpStatus, Injectable } from '@nestjs/common';
import { PracticeDiary } from '#src/core/practice-diaries/entities/practice-diary.entity';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import NotFoundExceptions = AllExceptions.NotFoundExceptions;

@Injectable()
export class PracticeDiariesService extends BaseEntityService<
  PracticeDiary,
  'NotFoundExceptions'
> {
  constructor(
    @InjectRepository(PracticeDiary)
    private readonly repository: Repository<PracticeDiary>,
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
