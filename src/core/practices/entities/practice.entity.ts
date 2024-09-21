import { CustomBaseEntity } from '#src/common/base-entity/base.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Direction } from '#src/core/directions/entities/direction.entity';
import { PracticeRequest } from '#src/core/practice-requests/entities/practice-request.entity';
import { Company } from '#src/core/companies/entities/company.entity';

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

  @OneToMany(() => PracticeRequest, (request) => request.practice, {
    nullable: true,
  })
  practiceRequests?: PracticeRequest[];

  @ManyToOne(() => Company, (company) => company.practices, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  company: Company;
}
