import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { UserAvatarEntity } from '#src/core/user-avatars/entities/user-avatar.entity';
import { PracticeRequest } from '#src/core/practice-requests/entities/practice-request.entity';
import { CVs } from '#src/core/cvs/entities/cv.entity';
import { Company } from '#src/core/companies/entities/company.entity';

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

  @Column({ default: 'student' })
  role: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => UserAvatarEntity, (avatar) => avatar.user, {
    nullable: true,
    eager: true,
  })
  avatar?: UserAvatarEntity;

  @OneToOne(() => CVs, (cv) => cv.user, {
    nullable: true,
    eager: true,
  })
  cv?: CVs;

  @OneToMany(
    () => PracticeRequest,
    (practiceRequests) => practiceRequests.user,
    {
      nullable: true,
    },
  )
  practiceRequests?: PracticeRequest[];

  @OneToOne(() => Company, (company) => company.user, {
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  company?: Company;
}
