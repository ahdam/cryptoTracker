import { CoinData, CoinDataList } from "../components/CoinList/types.tsx";

// Convert the market data [][] to a flat list []
export const convertMarketDataToFlatListData = (marketData: CoinDataList[]) => {
  const reply: CoinData[] = [];
  marketData.forEach((page: CoinDataList) => {
    page.forEach((coinData: CoinData) => {
      reply.push(coinData);
    });
  });

  return reply;
};
