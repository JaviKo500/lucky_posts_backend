import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'genders',
})
export class Gender {
  @PrimaryGeneratedColumn()
  id: string;

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
  type: string;

  @Column({
    type: 'timestamp',
    default: 'now()',
  })
  created_date: Date;

  @BeforeInsert()
  checkTypeInsert() {
    this.type = this.type.toLowerCase();
  }
}
