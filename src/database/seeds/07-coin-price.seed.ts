import { cleanTable } from '@modules/common/utils/query';
import { Price } from '@modules/price/price.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

const prices: Price[] = [
  new Price({
    coinId: 3,
    date: new Date('2021-04-30T00:00:00'),
    aed: 10.862864700849201,
    ars: 276.5360512188553,
    aud: 3.803079761198971,
    bch: 0.003357909288674648,
    bdt: 250.7189287094506,
    bhd: 1.1151254941956552,
    bmd: 2.957484628633865,
    bnb: 0.004928422456881903,
    brl: 15.786757199184681,
    btc: 0.00005517489813700061,
    cad: 3.631167094705742,
    chf: 2.6880843963269743,
    clp: 2098.036570046086,
    cny: 19.141432013444117,
    czk: 63.06854306966411,
    dkk: 18.13811126814933,
    dot: 0.08298603615973638,
    eos: 0.5029608187491528,
    eth: 0.0010704976048938244,
    eur: 2.4392357247044676,
    gbp: 2.1199841314973247,
    hkd: 22.960875537093298,
    huf: 878.8972316642515,
    idr: 42588.96164617911,
    ils: 9.609459055357133,
    inr: 219.16750376377257,
    jpy: 322.0020539117694,
    krw: 3275.348871716684,
    kwd: 0.890282725303765,
    lkr: 573.147295157985,
    ltc: 0.011561000697863111,
    mmk: 4605.1728205687505,
    mxn: 59.264667745099786,
    myr: 12.133080688970432,
    ngn: 1167.7003553706604,
    nok: 24.211084141701782,
    nzd: 4.081668898247027,
    php: 142.86267908896525,
    pkr: 454.08210485785963,
    pln: 11.142843855672716,
    rub: 221.06872275728963,
    sar: 11.0922826984616,
    sek: 24.74981066919988,
    sgd: 3.921121845181636,
    thb: 92.22620065931854,
    try: 24.283019040324074,
    twd: 82.44609474088932,
    uah: 82.06579179249296,
    usd: 2.957484628633865,
    vef: 0.2961329358651086,
    vnd: 68174.43186114376,
    xag: 0.11335485531928022,
    xau: 0.0016676072827014918,
    xdr: 2.0517135563299402,
    xlm: 5.977973976672367,
    xrp: 2.1160279722110373,
    yfi: 0.00006313408482810282,
    zar: 42.27546827554393,
    bits: 55.17489813700061,
    link: 0.0813828555493061,
    sats: 5517.489813700061,
  }),
];

export default class CreateCoin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await cleanTable(connection, 'price');

    await connection.createQueryBuilder().insert().into('price').values(prices).execute();
  }
}
