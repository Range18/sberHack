import { Practices } from '#src/core/practices/entities/practice.entity';
import { PracticeRequest } from '#src/core/practice-requests/entities/practice-request.entity';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';

export class PracticeRequestRdo {
  readonly id: number;

  user: GetUserRdo;

  practice: Practices;

  comment?: string;

  test?: string;

  status: string;

  constructor(request: PracticeRequest) {
    Object.assign(this, request);

    this.user = new GetUserRdo(request.user);
  }
}
