import { useInfiniteQuery } from "@tanstack/react-query";

import {
    API_KEY,
    BASE_URL,
    MARKET_DATA_LIST_ITEMS_NO,
} from "@app/configs/";

import { MarketListParams, MarketListServerReply } from "./types.ts";

// Hook for fetching market data from API
const useMarketList = () =>
  useInfiniteQuery({
    initialData: undefined,
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
  const defaultParams = {
    page: 1,
    per_page: MARKET_DATA_LIST_ITEMS_NO,
    order: "market_cap_desc",
    vs_currency: "usd",
  };
  const searchParams = new URLSearchParams({
    ...defaultParams,
    ...(params as any),
  });

  const reply = await fetch(
    `${BASE_URL}/api/v3/coins/markets?${searchParams}`,
    {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": API_KEY,
      },
    }
  );

  return reply.json();
};

export default useMarketList;
