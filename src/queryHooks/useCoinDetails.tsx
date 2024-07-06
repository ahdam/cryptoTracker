import { useQuery } from "@tanstack/react-query";

import {API_KEY, BASE_URL} from "@app/configs/";


// Hook for fetching coin details from API
const useCoinDetails = ({ coinId }: { coinId: string }) =>
  useQuery({
    queryKey: ["coin-detail", coinId],
    queryFn: () => getCoinDetails({ coinId }),
  });

const getCoinDetails = async ({ coinId }: { coinId: string }) => {
  const reply = await fetch(
    `${BASE_URL}/v3/coins/${coinId}`,
    {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": API_KEY,
      },
    }
  );
  return reply.json();
};

export default useCoinDetails;
