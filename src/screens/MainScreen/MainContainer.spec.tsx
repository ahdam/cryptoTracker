import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MainContainer from "./MainContainer.tsx";
import { mockMarketData } from "@app/queryHooks/__stubs__/marketData.tsx";

const mockMarketDataReply = {
  isError: false,
  isLoading: false,
  isFetching: false,
  data: { pages: [mockMarketData] },
};

const mockMarketDataReplyLoading = {
  ...mockMarketDataReply,
  isLoading: true,
};

jest.mock("@app/queryHooks/useMarketList.tsx", () => {
  return jest
    .fn()
    .mockImplementationOnce(() => mockMarketDataReply)
    .mockImplementationOnce(() => mockMarketDataReply)
    .mockImplementationOnce(() => mockMarketDataReply)
    .mockImplementation(() => mockMarketDataReplyLoading);
});
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("jotai", () => ({
  ...jest.requireActual("jotai"),
  __esModule: true,
  useAtomValue: jest.fn(() => []),
}));

const mockGoToCoinScreen = jest.fn();
const queryClient = new QueryClient();
const component = (
  <QueryClientProvider client={queryClient}>
    <MainContainer goToCoinScreen={mockGoToCoinScreen} />
  </QueryClientProvider>
);

describe("<MainContainer />", () => {
  it("Check if SearchBar is rendered", () => {
    render(component);
    expect(screen.getByTestId("search-bar-container")).toBeTruthy();
  });

  it("Check Search function", () => {
    render(component);
    expect(screen.getAllByTestId("coin-item").length).toBe(7);

    const searchBar = screen.getByTestId("search-bar-container");
    fireEvent(searchBar, "onChangeText", "btc");
    expect(screen.getAllByTestId("coin-item").length).toBe(1);
  });
});
