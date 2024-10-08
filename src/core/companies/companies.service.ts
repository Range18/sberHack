import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '#src/core/companies/entities/company.entity';
import NotFoundExceptions = AllExceptions.NotFoundExceptions;

@Injectable()
export class CompaniesService extends BaseEntityService<
  Company,
  'NotFoundExceptions'
> {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {
    super(
      companyRepository,
      new ApiException<'NotFoundExceptions'>(
        HttpStatus.NOT_FOUND,
        'NotFoundExceptions',
        NotFoundExceptions.NotFound,
      ),
    );
  }

  async count(): Promise<number> {
    return await this.companyRepository.count();
  }
}
