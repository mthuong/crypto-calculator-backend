import { Coin } from '@modules/coin/coin.entity';
import { BaseEntity } from '@modules/common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';

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
  @Column({ default: 0, type: 'float' })
  aed: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  ars: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  aud: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  bch: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  bdt: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  bhd: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  bmd: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  bnb: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  brl: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  btc: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  cad: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  chf: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  clp: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  cny: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  czk: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  dkk: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  dot: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  eos: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  eth: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  eur: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  gbp: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  hkd: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  huf: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  idr: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  ils: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  inr: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  jpy: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  krw: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  kwd: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  lkr: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  ltc: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  mmk: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  mxn: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  myr: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  ngn: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  nok: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  nzd: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  php: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  pkr: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  pln: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  rub: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  sar: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  sek: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  sgd: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  thb: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  try: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  twd: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  uah: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  usd: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  vef: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  vnd: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  xag: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  xau: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  xdr: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  xlm: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  xrp: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  yfi: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  zar: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  bits: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
  link: number;

  @Expose()
  @Column({ default: 0, type: 'float' })
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
