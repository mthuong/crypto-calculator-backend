import { BaseEntity } from '@modules/common/entities/base.entity';
import { Price } from '@modules/price/price.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, MaxLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity('coin')
export class Coin extends BaseEntity {
  static entityName: string = 'Coin';

  @Expose()
  @ApiProperty()
  @Column({ length: 100 })
  @Index('UIDX_Coin_identify', { unique: true })
  @MaxLength(100)
  identify: string;

  @Expose()
  @ApiProperty()
  @Column({ length: 100 })
  @Index('UIDX_Coin_symbol', { unique: true })
  @MaxLength(100)
  symbol: string;

  @Expose()
  @ApiProperty()
  @Column({ length: 100 })
  @MaxLength(100)
  name: string;

  @Expose()
  @Column({ nullable: true })
  @IsOptional()
  image: string;

  @Expose()
  @ApiProperty()
  @OneToMany(() => Price, (price) => price.coin)
  prices?: Price[];

  @Expose()
  @Index(`IDX_Coin_ICO_Date`)
  @Column({ type: 'datetime' })
  icoDate: Date;

  @Expose()
  @Index(`IDX_Coin_Created_At`)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Expose()
  @Index('IDX_Coin_Updated_At')
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @Index('IDX_Coin_Deleted_At')
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  constructor(partial: Partial<Coin>) {
    super();
    this.entityName = Coin.entityName;
    Object.assign(this, partial);
  }
}
