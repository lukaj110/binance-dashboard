import { atom } from 'jotai';
import { ConnectionState } from 'renderer/constants';
import { IndividualSymbolTickerData } from 'types';

const API_KEY = atom('');
const SECRET_KEY = atom('');
const BINANCE_SOCKET = atom<WebSocket | undefined>(undefined);
const TICKERS = atom<Record<string, IndividualSymbolTickerData>>({});

const BINANCE_SOCKET_STATE = atom(ConnectionState.CLOSED);

export { BINANCE_SOCKET, API_KEY, BINANCE_SOCKET_STATE, SECRET_KEY, TICKERS };
