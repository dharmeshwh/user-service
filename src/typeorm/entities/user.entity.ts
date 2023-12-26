import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_entity')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @Index({ unique: true })
  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 36,
  })
  username: string;

  @Index({ unique: true })
  @Column({
    name: 'email',
    length: 48,
    type: 'varchar',
  })
  email: string;

  @Column({
    name: 'type',
    type: 'varchar',
    default: 'default', // 'default' or 'admin'
  })
  type: string;
}
