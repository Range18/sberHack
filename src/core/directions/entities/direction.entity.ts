import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Practices } from '#src/core/practices/entities/practice.entity';

@Entity()
export class Direction extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @OneToMany(() => Practices, (practices) => practices.direction, {
    nullable: true,
  })
  practices?: Practices[];
}
