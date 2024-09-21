import { Direction } from '#src/core/directions/entities/direction.entity';
import { PracticeRequest } from '#src/core/practice-requests/entities/practice-request.entity';
import { Company } from '#src/core/companies/entities/company.entity';
import { Practices } from '#src/core/practices/entities/practice.entity';
import { PracticeRequestStatuses } from '#src/core/practice-requests/types/practice-request-statuses';

export class PracticesRdo {
  readonly id: number;

  name: string;

  description?: string;

  studyCondition: string;

  selectionConditions: string;

  vacanciesCount: number;

  acceptedCount: number;

  specialization: string;

  direction: Direction;

  practiceRequests?: PracticeRequest[];

  company: Company;

  isOpened: boolean;

  constructor(practice: Practices) {
    Object.assign(this, practice);

    this.acceptedCount = practice.practiceRequests
      ? practice.practiceRequests?.filter(
          (request) => request.status === PracticeRequestStatuses.Accepted,
        ).length
      : 0;
  }
}
