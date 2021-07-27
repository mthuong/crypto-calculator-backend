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
  @ApiProperty({ type: () => Coin })
  @ManyToOne(() => Coin)
  @JoinColumn({ name: 'coin_id', referencedColumnName: 'id' })
  coin?: Coin;

  @Expose()
  @Index(`IDX_Price_date`)
  @Column({ type: 'datetime' })
  date: Date;

  @Expose()
  @Column({ default: 0 })
  aed: number;

  @Expose()
  @Column({ default: 0 })
  ars: number;

  @Expose()
  @Column({ default: 0 })
  aud: number;

  @Expose()
  @Column({ default: 0 })
  bch: number;

  @Expose()
  @Column({ default: 0 })
  bdt: number;

  @Expose()
  @Column({ default: 0 })
  bhd: number;

  @Expose()
  @Column({ default: 0 })
  bmd: number;

  @Expose()
  @Column({ default: 0 })
  bnb: number;

  @Expose()
  @Column({ default: 0 })
  brl: number;

  @Expose()
  @Column({ default: 0 })
  btc: number;

  @Expose()
  @Column({ default: 0 })
  cad: number;

  @Expose()
  @Column({ default: 0 })
  chf: number;

  @Expose()
  @Column({ default: 0 })
  clp: number;

  @Expose()
  @Column({ default: 0 })
  cny: number;

  @Expose()
  @Column({ default: 0 })
  czk: number;

  @Expose()
  @Column({ default: 0 })
  dkk: number;

  @Expose()
  @Column({ default: 0 })
  dot: number;

  @Expose()
  @Column({ default: 0 })
  eos: number;

  @Expose()
  @Column({ default: 0 })
  eth: number;

  @Expose()
  @Column({ default: 0 })
  eur: number;

  @Expose()
  @Column({ default: 0 })
  gbp: number;

  @Expose()
  @Column({ default: 0 })
  hkd: number;

  @Expose()
  @Column({ default: 0 })
  huf: number;

  @Expose()
  @Column({ default: 0 })
  idr: number;

  @Expose()
  @Column({ default: 0 })
  ils: number;

  @Expose()
  @Column({ default: 0 })
  inr: number;

  @Expose()
  @Column({ default: 0 })
  jpy: number;

  @Expose()
  @Column({ default: 0 })
  krw: number;

  @Expose()
  @Column({ default: 0 })
  kwd: number;

  @Expose()
  @Column({ default: 0 })
  lkr: number;

  @Expose()
  @Column({ default: 0 })
  ltc: number;

  @Expose()
  @Column({ default: 0 })
  mmk: number;

  @Expose()
  @Column({ default: 0 })
  mxn: number;

  @Expose()
  @Column({ default: 0 })
  myr: number;

  @Expose()
  @Column({ default: 0 })
  ngn: number;

  @Expose()
  @Column({ default: 0 })
  nok: number;

  @Expose()
  @Column({ default: 0 })
  nzd: number;

  @Expose()
  @Column({ default: 0 })
  php: number;

  @Expose()
  @Column({ default: 0 })
  pkr: number;

  @Expose()
  @Column({ default: 0 })
  pln: number;

  @Expose()
  @Column({ default: 0 })
  rub: number;

  @Expose()
  @Column({ default: 0 })
  sar: number;

  @Expose()
  @Column({ default: 0 })
  sek: number;

  @Expose()
  @Column({ default: 0 })
  sgd: number;

  @Expose()
  @Column({ default: 0 })
  thb: number;

  @Expose()
  @Column({ default: 0 })
  try: number;

  @Expose()
  @Column({ default: 0 })
  twd: number;

  @Expose()
  @Column({ default: 0 })
  uah: number;

  @Expose()
  @Column({ default: 0 })
  usd: number;

  @Expose()
  @Column({ default: 0 })
  vef: number;

  @Expose()
  @Column({ default: 0 })
  vnd: number;

  @Expose()
  @Column({ default: 0 })
  xag: number;

  @Expose()
  @Column({ default: 0 })
  xau: number;

  @Expose()
  @Column({ default: 0 })
  xdr: number;

  @Expose()
  @Column({ default: 0 })
  xlm: number;

  @Expose()
  @Column({ default: 0 })
  xrp: number;

  @Expose()
  @Column({ default: 0 })
  yfi: number;

  @Expose()
  @Column({ default: 0 })
  zar: number;

  @Expose()
  @Column({ default: 0 })
  bits: number;

  @Expose()
  @Column({ default: 0 })
  link: number;

  @Expose()
  @Column({ default: 0 })
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

  constructor(partial: Partial<Price>, coinId: number, date: Date) {
    super();
    this.entityName = Price.entityName;
    this.coinId = coinId;
    this.date = date;
    Object.assign(this, partial);
  }
}
