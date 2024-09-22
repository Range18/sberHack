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
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.lastname = user.lastname;
    this.university = user.university;
    this.specialization = user.specialization;
    this.course = user.course;
    this.email = user.email;

    this.cv = user.cv ? new CvRdo(user.cv, user.id) : undefined;
    this.avatar = user.avatar ? new AvatarRdo(user.avatar, user.id) : undefined;
  }
}
