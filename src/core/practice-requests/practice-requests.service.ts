import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { PracticeRequest } from '#src/core/practice-requests/entities/practice-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import NotFoundExceptions = AllExceptions.NotFoundExceptions;

@Injectable()
export class PracticeRequestsService extends BaseEntityService<
  PracticeRequest,
  'NotFoundExceptions'
> {
  constructor(
    @InjectRepository(PracticeRequest)
    private readonly repository: Repository<PracticeRequest>,
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

  async count(options: FindManyOptions<PracticeRequest>): Promise<number> {
    return await this.repository.count(options);
  }
}
