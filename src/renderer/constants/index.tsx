const BINANCE_WEBSOCKET_URL = 'wss://fstream.binance.com/stream';
const BINANCE_API_URL = 'https://api.binance.com';
const BINANCE_FUTURES_API_URL = 'https://fapi.binance.com';

enum ConnectionState {
  CLOSED = 0,
  CONNECTING = 1,
  CONNECTED = 2,
  CLOSING = 3,
}

export {
  BINANCE_WEBSOCKET_URL,
  BINANCE_API_URL,
  BINANCE_FUTURES_API_URL,
  ConnectionState,
};
