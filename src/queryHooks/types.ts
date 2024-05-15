export type MarketListServerReply = [];

export type MarketListParams = {
  page?: number;
  per_page?: number;
  order?: string;
  vs_currency?: string;
  searchQuery?: string;
};

export type HistoricalDataParams = {
  id: string;
  vs_currency?: string;
  precision?: number;
  days?: number;
};
