import { useQuery } from "@tanstack/react-query";

import { mockCoinData } from "./__stubs__/coinData.tsx";
import { USE_MOCK_DATA } from "@app/configs/";

const useCoinDetails = ({ coinId }: { coinId: string }) =>
  useQuery({
    queryKey: ["coin-detail", coinId],
    queryFn: () => getCoinDetails({ coinId }),
  });

const getCoinDetails = async ({ coinId }: { coinId: string }) => {
  if (USE_MOCK_DATA) {
    return mockCoinData;
  }

  const reply = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}`,
    {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": "CG-NLfufgir3t8Hzg7RDzBwDWrG",
      },
    }
  );
  return reply.json();
};

export default useCoinDetails;
