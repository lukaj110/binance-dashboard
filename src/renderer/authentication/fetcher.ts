import { BINANCE_API_URL, BINANCE_FUTURES_API_URL } from 'renderer/constants';
import signRequest from './hash';

const fetcherWithoutAuth = (input: RequestInfo | URL) =>
  fetch(input).then((res) => res.json());

const fetcher = (input: RequestInfo | URL, apiKey: string, secretKey: string) =>
  fetch(signRequest(secretKey, `${BINANCE_API_URL}${input}`), {
    headers: {
      'X-MBX-APIKEY': apiKey,
    },
  }).then((res) => res.json());

const futuresFetcher = (
  input: RequestInfo | URL,
  apiKey: string,
  secretKey: string
) =>
  fetch(signRequest(secretKey, `${BINANCE_FUTURES_API_URL}${input}`), {
    headers: {
      'X-MBX-APIKEY': apiKey,
    },
  }).then((res) => res.json());

export { fetcher, futuresFetcher, fetcherWithoutAuth };
