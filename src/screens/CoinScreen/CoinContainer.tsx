import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { styles } from "./styles.tsx";

import { useCoinHistoricalData } from "@app/queryHooks/";
import { extractChartData } from "@app/utils/";
import { PriceChart } from "@app/components/";
import { ChartData } from "@app/components/PriceChart/types.tsx";
import Header from "./components/Header.tsx";

// Container for setting up data for CoinScreen
const CoinContainer = ({ coinId }: { coinId: string }): React.JSX.Element => {
  const [chartData, setChartData] = useState({ xAxisLabels: [], data: [] });
  const {
    isError: historicalDetailsError,
    isLoading: historicalDetailsLoading,
    data: historicalData,
  } = useCoinHistoricalData({ id: coinId });

  useEffect(() => {
    if (
      historicalData?.length > 0 &&
      !historicalDetailsError &&
      !historicalDetailsLoading
    ) {
      setChartData(extractChartData(historicalData));
    }
  }, [
    coinId,
    historicalData,
    historicalDetailsError,
    historicalDetailsLoading,
  ]);

  return (
    <View style={styles.container}>
      <Header coinId={coinId} />

      {chartData.data.length > 0 && (
        <PriceChart {...(chartData as ChartData)} />
      )}
    </View>
  );
};

export default CoinContainer;
