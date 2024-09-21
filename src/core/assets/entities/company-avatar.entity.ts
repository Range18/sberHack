import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { Company } from '#src/core/companies/entities/company.entity';

@Entity('assets')
export class CompanyAvatarEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  mimetype: string;

  @OneToOne(() => Company, (company) => company.avatar, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  company: Company;
}
