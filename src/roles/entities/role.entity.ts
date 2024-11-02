import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'roles',
})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    default: '',
  })
  description: string;

  @Column({
    type: 'timestamp',
    default: 'now()',
  })
  created_date: Date;

  @OneToMany(() => User, (user) => user.rol)
  user: User;

  @BeforeInsert()
  checkNameInsert() {
    this.name = this.name.toLowerCase();
  }
}
