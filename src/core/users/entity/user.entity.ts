import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { UserAvatarEntity } from '#src/core/user-avatars/entities/user-avatar.entity';

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
}
