import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { UserPractice } from '#src/core/active-practices/entities/user-practice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import NotFoundExceptions = AllExceptions.NotFoundExceptions;

@Injectable()
export class UserPracticesService extends BaseEntityService<
  UserPractice,
  'NotFoundExceptions'
> {
  constructor(
    @InjectRepository(UserPractice)
    private readonly repository: Repository<UserPractice>,
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
