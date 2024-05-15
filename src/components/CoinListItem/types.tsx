export interface CoinListItemProps {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  image: string;
}
