import { CompanyAvatarEntity } from '#src/core/assets/entities/company-avatar.entity';
import { backendServer } from '#src/common/configs/config';

export class GetFileRdo {
  readonly id: number;

  readonly name: string;

  readonly mimetype: string;

  readonly url: string;

  readonly updatedAt: Date;

  readonly createAt: Date;

  constructor(file: CompanyAvatarEntity) {
    this.id = file.id;
    this.name = file.name;
    this.mimetype = file.mimetype;
    this.url = `${backendServer.urlValue}/companies/${file.company.id}/avatars/source`;
    this.createAt = file.createdAt;
    this.updatedAt = file.updatedAt;
  }
}
