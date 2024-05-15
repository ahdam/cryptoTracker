import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "react-native-paper";

import { MainScreen, CoinScreen, SavedCoinsScreen } from "./src/screens";

const Stack = createStackNavigator();
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="CoinScreen" component={CoinScreen} />
            <Stack.Screen
              name="SavedCoinsScreen"
              component={SavedCoinsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
