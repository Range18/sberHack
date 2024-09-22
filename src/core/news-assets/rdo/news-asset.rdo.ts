import { backendServer } from '#src/common/configs/config';
import { NewsAssetsEntity } from '#src/core/news-assets/entities/news-assets.entity';

export class NewsAssetRdo {
  readonly id: number;

  readonly name: string;

  readonly mimetype: string;

  readonly url: string;

  readonly updatedAt: Date;

  readonly createAt: Date;

  constructor(file: NewsAssetsEntity) {
    this.id = file.id;
    this.name = file.name;
    this.mimetype = file.mimetype;
    this.url = `${backendServer.urlValue}/news/images/${file.name}/source`;
    this.createAt = file.createdAt;
    this.updatedAt = file.updatedAt;
  }
}
