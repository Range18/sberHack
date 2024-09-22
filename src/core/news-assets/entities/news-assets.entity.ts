import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { News } from '#src/core/news/entities/news.entity';

@Entity('news_assets')
export class NewsAssetsEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  mimetype: string;

  @OneToOne(() => News, (news) => news.image, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  news: News;
}
