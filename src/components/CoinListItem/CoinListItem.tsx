import React from "react";
import { Image, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import { useAtomValue } from "jotai/index";
import Icon from "react-native-vector-icons/MaterialIcons";

import { savedCoinsAtom } from "@app/atoms/savedCoinsAtom.tsx";

import { styles } from "./styles.tsx";
import { CoinListItemProps } from "./types.tsx";

// Render a single coin item
const CoinListItem = ({
  id,
  symbol,
  name,
  current_price,
  market_cap_rank,
  price_change_percentage_24h,
  image,
}: CoinListItemProps): React.JSX.Element => {
  const savedCoins = useAtomValue(savedCoinsAtom);
  const iconName = savedCoins.includes(id) ? "favorite" : "favorite-border";
  return (
    <>
      <View style={styles.container} testID="coin-item">
        {image && <Image style={styles.image} source={{ uri: image }} />}
        <View style={styles.column}>
          <View style={styles.row}>
            <Text>
              {market_cap_rank}. {name} ({symbol.toUpperCase()})
            </Text>
            <Text>{current_price} $</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={price_change_percentage_24h > 0 ? styles.gt0 : styles.lt0}
            >
              last 24h: {price_change_percentage_24h}
            </Text>
            <Icon name={iconName} color="#4F8EF7" size={20} />
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
};

export default CoinListItem;
