/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISubAccount {
  email: string;
  isFreeze: boolean;
  createTime: number;
  isManagedSubAccount: boolean;
  isAssetManagementSubAccount: boolean;
}

export interface FutureAccountTransactionHistoryEntry {
  symbol: string;
  incomeType: string;
  income: string;
  asset: string;
  info: string;
  time: number;
  tranId: string;
  tradeId: string;
}

export interface ExchangeRateLimit {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
}

export interface ExchangeFilter {
  filterType: string;
  minPrice: string;
  maxPrice: string;
  tickSize: string;
  multiplierUp: string;
  multiplierDown: string;
  avgPriceMins?: number;
  minQty: string;
  maxQty: string;
  stepSize: string;
  minNotional: string;
  applyToMarket?: boolean;
  limit?: number;
  minTrailingAboveDelta?: number;
  maxTrailingAboveDelta?: number;
  minTrailingBelowDelta?: number;
  maxTrailingBelowDelta?: number;
  maxNumOrders?: number;
  maxNumAlgoOrders?: number;
}

export interface ExchangeSymbol {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes: string[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  allowTrailingStop: boolean;
  cancelReplaceAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: ExchangeFilter[];
  permissions: string[];
}

export interface ExchangeInfo {
  timezone: string;
  serverTime: number;
  rateLimits: ExchangeFilter[];
  exchangeFilters: any[];
  symbols: ExchangeSymbol[];
}

export interface IndividualSymbolTickerData {
  e: string;
  E: number;
  s: string;
  p: string;
  P: string;
  w: string;
  x: string;
  c: string;
  Q: string;
  b: string;
  B: string;
  a: string;
  A: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
  O: number;
  C: number;
  F: number;
  L: number;
  n: number;
}
