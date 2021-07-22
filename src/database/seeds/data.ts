import { Coin } from '@modules/coin/coin.entity';

export const coins: Coin[] = [
  new Coin({
    id: 1,
    identify: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    icoDate: new Date('04/28/2013'),
  }),
  new Coin({
    id: 2,
    identify: 'binancecoin',
    symbol: 'bnb',
    name: 'Binance Coin',
    image: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615',
    icoDate: new Date('09/16/2017'),
  }),
  new Coin({
    id: 3,
    identify: 'tokocrypto',
    symbol: 'tko',
    name: 'Tokocrypto',
    image: 'https://assets.coingecko.com/coins/images/14577/large/tko-logo.png?1617093467',
    icoDate: new Date('04/07/2021'),
  }),
];
