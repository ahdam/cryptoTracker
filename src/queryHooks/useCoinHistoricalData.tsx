import { useQuery } from "@tanstack/react-query";

import { USE_MOCK_DATA } from "@app/configs/";
import { mockHistoricalData } from "./__stubs__/historicalData.tsx";

import { HistoricalDataParams } from "./types.ts";

// Hook for fetching historical data (for charts) for a coin from API
const useCoinHistoricalData = (params: HistoricalDataParams) => {
  return useQuery({
    queryKey: ["coin-historical-data", params.id],
    queryFn: () => getHistoricalData(params),
  });
};

const getHistoricalData = async (params: HistoricalDataParams) => {
  if (USE_MOCK_DATA) {
    return mockHistoricalData;
  }

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
    `https://api.coingecko.com/api/v3/coins/${params.id}/ohlc?${queryParams}`,
    {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": "CG-NLfufgir3t8Hzg7RDzBwDWrG",
      },
    }
  );

  return reply.json();
};

export default useCoinHistoricalData;
