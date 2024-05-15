import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { styles } from "./styles.tsx";
import { SaveCoinProps } from "./types.tsx";
import { Badge } from "react-native-paper";

// Render a button to save a coin for CoinScreen and a badge with the number of saved coins if there are any
const SaveCoin = ({
  isSaved,
  onPress,
  savedCoinsCount,
}: SaveCoinProps): React.JSX.Element => (
  <TouchableOpacity
    testID="save-coin-btn"
    onPress={onPress}
    style={styles.addToFavoritesIcon}
  >
    <Icon
      name={isSaved ? "favorite" : "favorite-border"}
      color="#4F8EF7"
      size={30}
    />
    <Badge size={savedCoinsCount ? 18 : 0} style={styles.badge}>
      {savedCoinsCount}
    </Badge>
  </TouchableOpacity>
);

export default SaveCoin;
