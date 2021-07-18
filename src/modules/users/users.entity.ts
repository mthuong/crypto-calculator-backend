import { BaseEntity } from '@modules/common/entities/base.entity';
import { Exclude } from 'class-transformer';
import { IsAscii, IsEmail, Length, MaxLength } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  static entityName: string = 'User';

  @Column({ length: 100 })
  @Index('UIDX_User_username', { unique: true })
  @MaxLength(100)
  @IsAscii()
  username: string;

  @Column({ length: 100, nullable: true })
  @Index('UIDX_User_email', { unique: true, where: 'email IS NOT NULL' })
  @MaxLength(100)
  @IsEmail()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Exclude()
  @Column({ length: 100, nullable: true })
  @Length(32)
  password: string;
}
