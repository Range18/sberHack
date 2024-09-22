import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { UserPractice } from '#src/core/active-practices/entities/user-practice.entity';

@Entity()
export class PracticeDiary extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  text: string;

  @Column()
  date: Date;

  @ManyToOne(() => UserPractice, (practice) => practice.diary, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  userPractice: UserPractice;
}
