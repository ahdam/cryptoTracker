import { useInfiniteQuery } from "@tanstack/react-query";

import { mockMarketData } from "./__stubs__/marketData.tsx";
import {
  MARKET_DATA_LIST_ITEMS_NO,
  MOCK_MARKET_DATA_LIST_ITEMS_NO,
  USE_MOCK_DATA,
} from "@app/configs/";

import { MarketListParams, MarketListServerReply } from "./types.ts";

const useMarketList = () =>
  useInfiniteQuery({
    initialData: undefined,
    // @ts-ignore
    initialPageParam: 1,
    queryKey: ["market-list"],
    queryFn: (pageParam) => getMarketList({ page: pageParam.pageParam }),
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    getPreviousPageParam: (firstPage, allPages) =>
      Math.min(0, allPages.length - 1),
  });

const getMarketList = async (
  params: MarketListParams
): Promise<MarketListServerReply | never> => {
  if (USE_MOCK_DATA) {
    return mockMarketData as [];
  }

  const defaultParams = {
    page: 1,
    per_page: USE_MOCK_DATA
      ? MOCK_MARKET_DATA_LIST_ITEMS_NO
      : MARKET_DATA_LIST_ITEMS_NO,
    order: "market_cap_desc",
    vs_currency: "usd",
  };
  const searchParams = new URLSearchParams({
    ...defaultParams,
    ...(params as any),
  });

  const reply = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?${searchParams}`,
    {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": "CG-NLfufgir3t8Hzg7RDzBwDWrG",
      },
    }
  );

  return reply.json();
};

export default useMarketList;
