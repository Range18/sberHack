import { CustomBaseEntity } from '#src/common/base-entity/base.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Direction } from '#src/core/directions/entities/direction.entity';

@Entity()
export class Practices extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column({ type: 'longtext' })
  description?: string;

  @Column()
  studyCondition: string;

  @Column({ type: 'longtext' })
  selectionConditions: string;

  @Column()
  vacanciesCount: number;

  @Column()
  specialization: string;

  @ManyToOne(() => Direction, (direction) => direction.practices, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  direction: Direction;
}
