import React, { useCallback } from "react";
import { SafeAreaView } from "react-native";
import { useAtom } from "jotai";

import { savedCoinsAtom } from "@app/atoms/savedCoinsAtom.tsx";
import CoinContainer from "./CoinContainer.tsx";
import { SaveCoin } from "@app/components/";

import { CoinScreenProps } from "./types.tsx";
import { styles } from "./styles.tsx";

// Render a screen with a single coin
// Handles saving and removing coins from the saved list
// Handles navigation options and functions
const CoinScreen = ({
  route,
  navigation,
}: CoinScreenProps): React.JSX.Element => {
  const { coinId, coinName } = route.params;
  const [savedCoins, setSavedCoins] = useAtom(savedCoinsAtom);

  // Add / Remove coin from saved coins list
  const toggleFavorite = useCallback(() => {
    if (savedCoins.includes(coinId)) {
      setSavedCoins(savedCoins.filter((item) => item !== coinId)).then();
    } else {
      setSavedCoins([...savedCoins, coinId]).then();
    }
  }, [coinId, savedCoins, setSavedCoins]);

  const renderSaveIcon = useCallback(() => {
    return (
      <SaveCoin
        isSaved={savedCoins.includes(coinId)}
        onPress={toggleFavorite}
      />
    );
  }, [coinId, savedCoins, toggleFavorite]);

  React.useEffect(() => {
    // On mount, set the title of the screen and save coin button
    navigation.setOptions({
      title: coinName,
      headerRight: renderSaveIcon,
    });
  }, [
    coinId,
    coinName,
    navigation,
    renderSaveIcon,
    savedCoins,
    toggleFavorite,
  ]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <CoinContainer coinId={coinId} />
    </SafeAreaView>
  );
};

export default CoinScreen;
