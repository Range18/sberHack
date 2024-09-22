import { backendServer } from '#src/common/configs/config';
import { UserAvatarEntity } from '#src/core/user-avatars/entities/user-avatar.entity';

export class AvatarRdo {
  readonly id: number;

  readonly name: string;

  readonly mimetype: string;

  readonly url: string;

  readonly updatedAt: Date;

  readonly createAt: Date;

  constructor(file: UserAvatarEntity, userId?: number) {
    this.id = file.id;
    this.name = file.name;
    this.mimetype = file.mimetype;
    this.url = `${backendServer.urlValue}/users/${userId ?? file.user.id}/avatars/source`;
    this.createAt = file.createdAt;
    this.updatedAt = file.updatedAt;
  }
}
