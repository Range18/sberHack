import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { NewsAssetsEntity } from '#src/core/news-assets/entities/news-assets.entity';

@Entity()
export class News extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  title: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @OneToOne(() => NewsAssetsEntity, (image) => image.news, {
    nullable: true,
    eager: true,
  })
  image?: NewsAssetsEntity;
}
