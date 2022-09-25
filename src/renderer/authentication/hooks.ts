import { useAtom } from 'jotai';
import { ConnectionState } from 'renderer/constants';
import { API_KEY, SECRET_KEY, BINANCE_SOCKET_STATE } from 'renderer/state';
import useSWR from 'swr';
import {
  ExchangeInfo,
  FutureAccountTransactionHistoryEntry,
  ISubAccount,
} from 'types';
import { fetcher, fetcherWithoutAuth, futuresFetcher } from './fetcher';

const useAuth = () => {
  const [apiKey] = useAtom(API_KEY);
  const [secretKey] = useAtom(SECRET_KEY);
  const data = useSWR(
    apiKey && secretKey ? `/sapi/v1/account/status` : null,
    (url) => fetcher(url, apiKey, secretKey),
    { revalidateOnFocus: false }
  );

  return { ...data };
};

const useGetWallet = () => {
  const [apiKey] = useAtom(API_KEY);
  const [secretKey] = useAtom(SECRET_KEY);
  const { error } = useAuth();
  const data = useSWR(
    !error ? `/sapi/v1/capital/config/getall` : null,
    (url) => fetcher(url, apiKey, secretKey),
    { revalidateOnFocus: false }
  );

  return { ...data };
};

const useGetSubAccounts = () => {
  const [apiKey] = useAtom(API_KEY);
  const [secretKey] = useAtom(SECRET_KEY);
  const { error } = useAuth();
  const data = useSWR<ISubAccount[]>(
    !error ? `/sapi/v1/sub-account/list` : null,
    (url) => fetcher(url, apiKey, secretKey),
    { revalidateOnFocus: false }
  );

  return { ...data };
};

const useGetFutureAccountTransactionHistory = () => {
  const [apiKey] = useAtom(API_KEY);
  const [secretKey] = useAtom(SECRET_KEY);
  const [connectionStatus] = useAtom(BINANCE_SOCKET_STATE);
  const data = useSWR<FutureAccountTransactionHistoryEntry[]>(
    connectionStatus === ConnectionState.CONNECTED ? `/fapi/v1/income` : null,
    (url) => futuresFetcher(url, apiKey, secretKey),
    { refreshInterval: 10000 }
  );

  return { ...data };
};

const useGetExchangeInfo = () => {
  const data = useSWR<ExchangeInfo>(
    'https://api.binance.com/api/v3/exchangeInfo',
    fetcherWithoutAuth,
    { revalidateOnFocus: false, revalidateIfStale: false }
  );

  return { ...data };
};

export {
  useAuth,
  useGetWallet,
  useGetSubAccounts,
  useGetFutureAccountTransactionHistory,
  useGetExchangeInfo,
};
