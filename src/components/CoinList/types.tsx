import { MainContainerProps } from "@app/screens/MainScreen/types.tsx";
import { CoinListItemProps } from "../CoinListItem/types.tsx";

export type CoinListType = {
  marketData: any;
  isLoading: boolean;
  loadNextPage?: () => void;
} & MainContainerProps;

export type CoinData = {
  [key: string]: any;
} & CoinListItemProps;

export type CoinDataList = CoinData[];
