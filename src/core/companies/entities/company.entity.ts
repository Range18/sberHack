import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { CompanyAvatarEntity } from '#src/core/assets/entities/company-avatar.entity';
import { Practices } from '#src/core/practices/entities/practice.entity';
import { UserEntity } from '#src/core/users/entity/user.entity';

@Entity()
export class Company extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  address?: string;

  @OneToOne(() => CompanyAvatarEntity, (avatar) => avatar.company, {
    nullable: true,
    eager: true,
  })
  avatar?: CompanyAvatarEntity;

  @OneToMany(() => Practices, (practice) => practice.company, {
    nullable: true,
  })
  practices?: Practices[];

  @OneToOne(() => UserEntity, (user) => user.company, {
    nullable: true,
  })
  user?: UserEntity;
}
