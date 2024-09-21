import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { CompanyAvatarEntity } from '#src/core/assets/entities/company-avatar.entity';

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

  @OneToOne(() => CompanyAvatarEntity, (avatar) => avatar.company, {
    nullable: true,
    eager: true,
  })
  avatar?: CompanyAvatarEntity;
}
