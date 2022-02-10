import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoEntity } from '../todo/todo.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  nickname!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false, name: 'user_password', select: false })
  userPassword!: string;

  @Column({ nullable: true, name: 'refresh_token' })
  @Exclude()
  refreshToken?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => TodoEntity, (todo) => todo.user)
  @JoinColumn({ name: 'id' })
  todos?: TodoEntity[];
}
