import React, { useCallback } from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAtomValue } from "jotai/index";

import { savedCoinsAtom } from "@app/atoms/savedCoinsAtom.tsx";
import MainContainer from "./MainContainer.tsx";

import { styles } from "./styles.tsx";
import { SaveCoin } from "@app/components/";

// Render a screen with a list of coins
// Handles navigation options and functions
const MainScreen = (): React.JSX.Element => {
  const navigation = useNavigation() as any;
  const savedCoins = useAtomValue(savedCoinsAtom);

  const goToCoinScreen = useCallback(
    (coinId: string, coinName: string) => {
      navigation.push("CoinScreen", { coinId, coinName });
    },
    [navigation]
  );

  const goFavoritesScreen = useCallback(() => {
    navigation.push("SavedCoinsScreen");
  }, [navigation]);

  const renderSavedIcon = useCallback(() => {
    return (
      <SaveCoin
        onPress={goFavoritesScreen}
        savedCoinsCount={savedCoins.length}
      />
    );
  }, [goFavoritesScreen, savedCoins]);

  React.useEffect(() => {
    // On mount, set the title of the screen and saved coins icon + count
    navigation.setOptions({
      title: "Market",
      headerRight: renderSavedIcon,
    });
  }, [renderSavedIcon, navigation, goFavoritesScreen, savedCoins]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <MainContainer goToCoinScreen={goToCoinScreen} />
    </SafeAreaView>
  );
};

export default MainScreen;
