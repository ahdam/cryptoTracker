import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { mockMarketData } from "@app/queryHooks/__stubs__/marketData.tsx";
import { CoinList } from "../index.tsx";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("jotai", () => ({
  ...jest.requireActual("jotai"),
  __esModule: true,
  useAtomValue: jest.fn(() => []),
}));
const goToCoinScreenMock = jest.fn();
const queryClient = new QueryClient();
const component = (
  <QueryClientProvider client={queryClient}>
    <CoinList
      isLoading={false}
      marketData={[mockMarketData]}
      goToCoinScreen={goToCoinScreenMock}
    />
  </QueryClientProvider>
);

describe("<CoinList />", () => {
  it("Check List render", () => {
    render(component);
    expect(screen.getByText(/Bitcoin/)).toBeTruthy();
  });

  it("Check list item press", () => {
    render(component);

    fireEvent.press(screen.getByText(/Bitcoin/), {
      coinId: "bitcoin",
      coinName: "Bitcoin",
    });
    expect(goToCoinScreenMock).toHaveBeenCalledWith("bitcoin", "Bitcoin");
  });
});
