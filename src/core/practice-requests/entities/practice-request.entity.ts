import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { Practices } from '#src/core/practices/entities/practice.entity';

@Entity()
export class PracticeRequest extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => UserEntity, (user) => user.practiceRequests, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => Practices, (practice) => practice.practiceRequests, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  practice: Practices;

  @Column({ type: 'longtext' })
  comment?: string;

  @Column({ type: 'longtext' })
  test?: string;

  @Column({ default: false })
  isAccepted: boolean;
}
