import React, { useEffect } from "react";
import { View } from "react-native";
import { useAtomValue } from "jotai/index";

import { savedCoinsAtom } from "@app/atoms/savedCoinsAtom.tsx";
import { useMarketList } from "@app/queryHooks/";
import { CoinList } from "@app/components/";
import { CoinData, CoinDataList } from "@app/components/CoinList/types.tsx";

import { styles } from "./styles.tsx";
import { MainContainerProps } from "./types.tsx";

// Container for setting up data for SavedCoinsContainer
const SavedCoinsContainer = ({
  goToCoinScreen,
}: MainContainerProps): React.JSX.Element => {
  const [marketData, setMarketData] = React.useState([]);
  const { data: marketList } = useMarketList();
  const savedCoins = useAtomValue(savedCoinsAtom);

  //TODO: Instead of using marketList (which may contain old data) to get coin data, use a different request to get coin data based on ids in savedCoins
  useEffect(() => {
    if (marketList && marketList.pages) {
      const marketDataPages = [...marketList.pages] as [];
      const filteredMarketData = marketDataPages.map((page: CoinDataList) =>
        page.filter((coinData: CoinData) => savedCoins.includes(coinData.id))
      ) as [];

      setMarketData(filteredMarketData);
    }
  }, [marketList, savedCoins]);

  return (
    <View style={styles.container}>
      <CoinList
        marketData={marketData}
        goToCoinScreen={goToCoinScreen}
        isLoading={marketList?.pages.length === 0}
      />
    </View>
  );
};

export default SavedCoinsContainer;
