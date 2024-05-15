import React, { useCallback } from "react";
import { SafeAreaView } from "react-native";
import { useAtom } from "jotai";

import { savedCoinsAtom } from "@app/atoms/savedCoinsAtom.tsx";
import CoinContainer from "./CoinContainer.tsx";
import { SaveCoin } from "@app/components/";

import { CoinScreenProps } from "./types.tsx";
import { styles } from "./styles.tsx";

const CoinScreen = ({
  route,
  navigation,
}: CoinScreenProps): React.JSX.Element => {
  const { coinId, coinName } = route.params;
  const [savedCoins, setSavedCoins] = useAtom(savedCoinsAtom);

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
