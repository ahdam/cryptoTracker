import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import { CoinListItem } from "@app/components/";
import { convertMarketDataToFlatListData } from "@app/utils/marketData.utils.tsx";

import { styles } from "./styles.tsx";
import { CoinListType } from "./types.tsx";

const CoinList = ({
  marketData,
  goToCoinScreen,
  loadNextPage,
  isLoading,
}: CoinListType): React.JSX.Element => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      </View>
    );
  }

  const flatListData = convertMarketDataToFlatListData(marketData);

  const fetchNextPage = () => {
    if (isLoading) {
      return <ActivityIndicator size={"large"} />;
    } else {
      loadNextPage && loadNextPage();
    }
  };

  return (
    <>
      <View style={styles.container} />
      <FlatList
        keyExtractor={(coin) => coin.id}
        data={flatListData}
        renderItem={({ item: coinData }) => (
          <TouchableOpacity
            key={coinData.symbol}
            onPress={() => goToCoinScreen(coinData.id, coinData.name)}
          >
            <CoinListItem {...coinData} />
          </TouchableOpacity>
        )}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={1}
      />
      <View />
    </>
  );
};

export default CoinList;
