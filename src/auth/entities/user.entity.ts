import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 100,
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
    nullable: false,
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

  // TODO: avatar
}
