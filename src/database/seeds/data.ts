export const COIN_IDS = {
  bitcoin: 1,
  binancecoin: 2,
  tokocrypto: 3,
};

export const coins = [
  {
    id: COIN_IDS.bitcoin,
    identify: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    icoDate: new Date('04/28/2013'),
  },
  {
    id: COIN_IDS.binancecoin,
    identify: 'binancecoin',
    symbol: 'bnb',
    name: 'Binance Coin',
    image: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615',
    icoDate: new Date('09/16/2017'),
  },
  {
    id: COIN_IDS.tokocrypto,
    identify: 'tokocrypto',
    symbol: 'tko',
    name: 'Tokocrypto',
    image: 'https://assets.coingecko.com/coins/images/14577/large/tko-logo.png?1617093467',
    icoDate: new Date('04/07/2021'),
  },
];
