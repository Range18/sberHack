import { UserEntity } from '#src/core/users/entity/user.entity';
import { CvRdo } from '#src/core/cvs/rdo/cv.rdo';
import { AvatarRdo } from '#src/core/user-avatars/rdo/avatar.rdo';

export class GetUserRdo {
  readonly id: number;

  name: string;

  surname?: string;

  lastname?: string;

  university?: string;

  specialization?: string;

  course?: number;

  email: string;

  cv?: CvRdo;

  avatar?: AvatarRdo;

  constructor(user: UserEntity) {
    Object.assign(this, user);

    this.cv = user.cv ? new CvRdo(user.cv) : undefined;
    this.avatar = user.avatar ? new AvatarRdo(user.avatar) : undefined;
  }
}
