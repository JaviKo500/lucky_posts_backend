import { User } from 'src/auth/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'genders',
})
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  value: string;

  @Column({
    type: 'timestamp',
    default: 'now()',
  })
  created_date: Date;

  @OneToMany(() => User, (user) => user.gender)
  user: User;
  @BeforeInsert()
  checkTypeInsert() {
    this.value = this.value.toLowerCase();
  }
}
