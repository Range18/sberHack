import { backendServer } from '#src/common/configs/config';
import { CVs } from '../entities/cv.entity';

export class CvRdo {
  readonly id: number;

  readonly name: string;

  readonly mimetype: string;

  readonly url: string;

  readonly updatedAt: Date;

  readonly createAt: Date;

  constructor(file: CVs) {
    this.id = file.id;
    this.name = file.name;
    this.mimetype = file.mimetype;
    this.url = `${backendServer.urlValue}/users/${file.user.id}/cvs/source`;
    this.createAt = file.createdAt;
    this.updatedAt = file.updatedAt;
  }
}
