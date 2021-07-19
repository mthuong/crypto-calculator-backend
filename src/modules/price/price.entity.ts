import { Coin } from '@modules/coin/coin.entity';
import { BaseEntity } from '@modules/common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity('price')
export class Price extends BaseEntity {
  static entityName: string = 'Price';

  @Exclude()
  @Index(`IDX_Coin_Price_Coin_Id`)
  @Column({ name: 'coin_id', nullable: true, default: null })
  coinId: number;

  @Expose()
  @ApiProperty()
  @ManyToOne(() => Coin)
  @JoinColumn({ name: 'coin_id', referencedColumnName: 'id' })
  coin?: Coin;

  @Expose()
  @Index(`IDX_Price_date`)
  @Column({ type: 'datetime' })
  date: Date;

  @Expose()
  @Column()
  aed: number;

  @Expose()
  @Column()
  ars: number;

  @Expose()
  @Column()
  aud: number;

  @Expose()
  @Column()
  bch: number;

  @Expose()
  @Column()
  bdt: number;

  @Expose()
  @Column()
  bhd: number;

  @Expose()
  @Column()
  bmd: number;

  @Expose()
  @Column()
  bnb: number;

  @Expose()
  @Column()
  brl: number;

  @Expose()
  @Column()
  btc: number;

  @Expose()
  @Column()
  cad: number;

  @Expose()
  @Column()
  chf: number;

  @Expose()
  @Column()
  clp: number;

  @Expose()
  @Column()
  cny: number;

  @Expose()
  @Column()
  czk: number;

  @Expose()
  @Column()
  dkk: number;

  @Expose()
  @Column()
  dot: number;

  @Expose()
  @Column()
  eos: number;

  @Expose()
  @Column()
  eth: number;

  @Expose()
  @Column()
  eur: number;

  @Expose()
  @Column()
  gbp: number;

  @Expose()
  @Column()
  hkd: number;

  @Expose()
  @Column()
  huf: number;

  @Expose()
  @Column()
  idr: number;

  @Expose()
  @Column()
  ils: number;

  @Expose()
  @Column()
  inr: number;

  @Expose()
  @Column()
  jpy: number;

  @Expose()
  @Column()
  krw: number;

  @Expose()
  @Column()
  kwd: number;

  @Expose()
  @Column()
  lkr: number;

  @Expose()
  @Column()
  ltc: number;

  @Expose()
  @Column()
  mmk: number;

  @Expose()
  @Column()
  mxn: number;

  @Expose()
  @Column()
  myr: number;

  @Expose()
  @Column()
  ngn: number;

  @Expose()
  @Column()
  nok: number;

  @Expose()
  @Column()
  nzd: number;

  @Expose()
  @Column()
  php: number;

  @Expose()
  @Column()
  pkr: number;

  @Expose()
  @Column()
  pln: number;

  @Expose()
  @Column()
  rub: number;

  @Expose()
  @Column()
  sar: number;

  @Expose()
  @Column()
  sek: number;

  @Expose()
  @Column()
  sgd: number;

  @Expose()
  @Column()
  thb: number;

  @Expose()
  @Column()
  try: number;

  @Expose()
  @Column()
  twd: number;

  @Expose()
  @Column()
  uah: number;

  @Expose()
  @Column()
  usd: number;

  @Expose()
  @Column()
  vef: number;

  @Expose()
  @Column()
  vnd: number;

  @Expose()
  @Column()
  xag: number;

  @Expose()
  @Column()
  xau: number;

  @Expose()
  @Column()
  xdr: number;

  @Expose()
  @Column()
  xlm: number;

  @Expose()
  @Column()
  xrp: number;

  @Expose()
  @Column()
  yfi: number;

  @Expose()
  @Column()
  zar: number;

  @Expose()
  @Column()
  bits: number;

  @Expose()
  @Column()
  link: number;

  @Expose()
  @Column()
  sats: number;

  @Expose()
  @Index(`IDX_Price_Created_At`)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Expose()
  @Index('IDX_Price_Updated_At')
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @Index('IDX_Price_Deleted_At')
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  constructor(partial: Partial<Price>) {
    super();
    this.entityName = Price.entityName;
    Object.assign(this, partial);
  }
}
