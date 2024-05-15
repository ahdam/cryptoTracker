import { CoinData, CoinDataList } from "../components/CoinList/types.tsx";

export const convertMarketDataToFlatListData = (marketData: CoinDataList[]) => {
  const reply: CoinData[] = [];
  marketData.forEach((page: CoinDataList) => {
    page.forEach((coinData: CoinData) => {
      reply.push(coinData);
    });
  });

  return reply;
};
