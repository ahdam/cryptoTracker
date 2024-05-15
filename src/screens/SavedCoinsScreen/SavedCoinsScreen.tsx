import React, { useCallback } from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAtomValue } from "jotai/index";

import { styles } from "./styles.tsx";

import { savedCoinsAtom } from "../../atoms/savedCoinsAtom.tsx";
import SavedCoinsContainer from "./SavedCoinsContainer.tsx";

// Render a screen with a list of saved coins
// Handles navigation options and functions
const SavedCoinsScreen = (): React.JSX.Element => {
  const navigation = useNavigation() as any;
  const savedCoins = useAtomValue(savedCoinsAtom);

  const goToCoinScreen = useCallback(
    (coinId: string, coinName: string) => {
      navigation.push("CoinScreen", { coinId, coinName });
    },
    [navigation]
  );

  React.useEffect(() => {
    // On mount, set the title of the screen
    navigation.setOptions({
      title: "Favorites",
    });
  }, [navigation, savedCoins]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <SavedCoinsContainer goToCoinScreen={goToCoinScreen} />
    </SafeAreaView>
  );
};

export default SavedCoinsScreen;
