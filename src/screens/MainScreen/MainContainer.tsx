import React, { useDeferredValue, useEffect } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";

import { useMarketList } from "@app/queryHooks/";
import { CoinList } from "@app/components/";

import { CoinData, CoinDataList } from "@app/components/CoinList/types.tsx";
import { styles } from "./styles.tsx";
import { MainContainerProps } from "./types.tsx";

// Container for setting up data for MainScreen
const MainContainer = ({
  goToCoinScreen,
}: MainContainerProps): React.JSX.Element => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [marketData, setMarketData] = React.useState([]);
  const searchQueryDeferred = useDeferredValue(searchQuery);
  const {
    isError,
    isLoading,
    isFetching,
    data: marketList,
    hasNextPage,
    fetchNextPage,
  } = useMarketList();

  const onChangeText = (query: string) => {
    //TODO: Instead filtering marketList, use a different request to get coins data based on query
    if (!marketList || !marketList.pages) {
      return;
    }
    const marketDataCopy = [...marketList.pages] as [];
    const filteredMarketData = marketDataCopy.map((page: CoinDataList) =>
      page.filter(
        (coinData: CoinData) =>
          coinData.name.toLowerCase().includes(query.toLowerCase()) ||
          coinData.symbol.toLowerCase().includes(query.toLowerCase())
      )
    ) as [];
    setSearchQuery(query);
    setMarketData(filteredMarketData);
  };

  useEffect(() => {
    if (
      !isFetching &&
      !isLoading &&
      !isError &&
      marketList &&
      marketList.pages
    ) {
      setMarketData(marketList.pages as []);
    }
  }, [marketList, isFetching, isLoading, isError]);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeText}
        value={searchQueryDeferred}
        style={styles.searchBar}
      />
      <CoinList
        marketData={marketData}
        goToCoinScreen={goToCoinScreen}
        loadNextPage={() => {
          hasNextPage && !searchQueryDeferred && fetchNextPage();
        }}
        isLoading={marketList?.pages.length === 0 && isFetching && isLoading}
      />
    </View>
  );
};

export default MainContainer;
