import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { Practices } from '#src/core/practices/entities/practice.entity';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { UserPracticeStatuses } from '#src/core/active-practices/types/user-practice-statuses';
import { PracticeDiary } from '#src/core/practice-diaries/entities/practice-diary.entity';

@Entity()
export class UserPractice extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => Practices, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  practice: Practices;

  @ManyToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  user: UserEntity;

  @Column({ default: UserPracticeStatuses.Active })
  status: string;

  @OneToMany(() => PracticeDiary, (diary) => diary.userPractice, {
    nullable: true,
    eager: true,
  })
  diary?: PracticeDiary[];
}
