import React from "react";
import { Image, Text, View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import { useCoinDetails } from "@app/queryHooks/";
import { useOrientation } from "@app/hooks/";

import { styles } from "./../styles.tsx";

const Header = ({ coinId }: { coinId: string }): React.JSX.Element => {
  const orientation = useOrientation();
  const { isError, isLoading, data: coinData } = useCoinDetails({ coinId });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      </View>
    );
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  const image = coinData?.image?.large;
  const {
    low_24h: low24h,
    high_24h: high24h,
    total_supply: totalSupply,
    circulating_supply: circulatingSupply,
    current_price: currentPrice,
  } = coinData?.market_data;

  if (orientation === "LANDSCAPE") {
    return <></>;
  }

  return (
    <View style={styles.row}>
      {image && <Image style={styles.image} source={{ uri: image }} />}
      <View style={styles.column}>
        <Text>Current Price: {currentPrice?.aed} aed</Text>
        <Text>Circulating Supply: {circulatingSupply} USD</Text>
        <Text>Total Supply: {totalSupply} </Text>
        <Text>High 24h: {high24h?.usd} USD</Text>
        <Text>Low 24h: {low24h?.usd} USD</Text>
      </View>
    </View>
  );
};

export default Header;
