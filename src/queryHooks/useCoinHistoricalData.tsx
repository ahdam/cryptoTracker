import { useQuery } from "@tanstack/react-query";

import {API_KEY, BASE_URL} from "@app/configs/";

import { HistoricalDataParams } from "./types.ts";

// Hook for fetching historical data (for charts) for a coin from API
const useCoinHistoricalData = (params: HistoricalDataParams) => {
  return useQuery({
    queryKey: ["coin-historical-data", params.id],
    queryFn: () => getHistoricalData(params),
  });
};

const getHistoricalData = async (params: HistoricalDataParams) => {
  const defaultParams = {
    vs_currency: "usd",
    precision: 2,
    days: 30,
  };

  const queryParams = new URLSearchParams({
    ...defaultParams,
    ...(params as any),
  });

  const reply = await fetch(
    `${BASE_URL}/api/v3/coins/${params.id}/ohlc?${queryParams}`,
    {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": API_KEY,
      },
    }
  );

  return reply.json();
};

export default useCoinHistoricalData;
