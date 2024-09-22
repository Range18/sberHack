import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';

@Entity()
export class News extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;
}
