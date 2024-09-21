import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { UserAvatarEntity } from '#src/core/user-avatars/entities/user-avatar.entity';
import { PracticeRequest } from '#src/core/practice-requests/entities/practice-request.entity';

@Entity('users')
export class UserEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true, default: '' })
  surname?: string;

  @Column({ nullable: true, default: '' })
  lastname?: string;

  @Column({ nullable: true })
  university?: string;

  @Column({ nullable: true })
  specialization?: string;

  @Column({ nullable: true })
  course?: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => UserAvatarEntity, (avatar) => avatar.user, {
    nullable: false,
  })
  avatar?: UserAvatarEntity;

  @OneToMany(
    () => PracticeRequest,
    (practiceRequests) => practiceRequests.user,
    {
      nullable: true,
    },
  )
  practiceRequests?: PracticeRequest[];
}
