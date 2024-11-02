import { Gender } from 'src/genders/entities/gender.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: '',
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: '',
  })
  last_name: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'text',
    select: false,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: 'register',
  })
  status: string;

  @Column({
    type: 'timestamp',
    default: 'now()',
  })
  created_date: Date;

  @Column({
    type: 'timestamp',
    default: null,
  })
  created_update: Date;

  @ManyToOne(() => Role, (role) => role.user, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({
    name: 'rol_id',
  })
  rol: Role;

  @ManyToOne(() => Gender, (gender) => gender.user, {
    eager: true,
  })
  @JoinColumn({
    name: 'gender_id',
  })
  gender: Gender;
  // TODO: avatar
}
