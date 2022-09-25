/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  useColorMode,
  Circle,
  HStack,
  Button,
  Text,
} from '@chakra-ui/react';

import { useAtom } from 'jotai';

import {
  API_KEY,
  BINANCE_SOCKET,
  BINANCE_SOCKET_STATE,
  SECRET_KEY,
} from 'renderer/state';
import { ConnectionState, BINANCE_WEBSOCKET_URL } from 'renderer/constants';

import { useAuth } from 'renderer/authentication/hooks';
import { useEffect } from 'react';
import {
  ThemeSwitchButton,
  MinimizeButton,
  MaximizeButton,
  CloseButton,
  AuthButton,
} from './buttons';

const TitleBar = () => {
  const [connectionState, setConnectionState] = useAtom(BINANCE_SOCKET_STATE);
  const [apiKey] = useAtom(API_KEY);
  const [secretKey] = useAtom(SECRET_KEY);
  const [socket, setSocket] = useAtom(BINANCE_SOCKET);
  const { data, mutate } = useAuth();

  const { colorMode } = useColorMode();

  const isConnectionOpen = () => connectionState === ConnectionState.CONNECTED;

  const getStatusColor = () => {
    switch (connectionState) {
      case ConnectionState.CLOSED:
        return 'red.400';
      case ConnectionState.CONNECTED:
        return 'green.400';
      default:
        return 'yellow.400';
    }
  };
  function handleConnect() {
    if (
      data &&
      connectionState !== ConnectionState.CONNECTED &&
      connectionState !== ConnectionState.CLOSING
    ) {
      if (connectionState === ConnectionState.CLOSED) {
        setConnectionState(ConnectionState.CONNECTING);
      }

      const newSocket = new WebSocket(BINANCE_WEBSOCKET_URL);

      newSocket.onopen = () => {
        setConnectionState(ConnectionState.CONNECTED);
      };

      newSocket.onclose = () => {
        setConnectionState(ConnectionState.CLOSED);
      };

      newSocket.onerror = () => {
        setConnectionState(ConnectionState.CLOSED);
      };

      setSocket(newSocket);
    }
  }

  function handleDisconnect() {
    if (socket) {
      setConnectionState(ConnectionState.CLOSING);
      socket.close();
    }
  }

  async function startConnect() {
    setConnectionState(ConnectionState.CONNECTING);
    await mutate();
    handleConnect();
  }

  useEffect(() => {
    handleConnect();

    return () => {
      if (socket) {
        setConnectionState(ConnectionState.CLOSED);
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    handleConnect();
  }, [data]);

  function GetTitleBar() {
    return (
      <HStack spacing={4} sx={{ WebkitAppRegion: 'no-drag' }}>
        <Circle
          bg={getStatusColor()}
          size={2.5}
          boxShadow={Array(useColorModeValue(3, 4))
            .fill(
              `0 0 10px ${
                isConnectionOpen()
                  ? colorMode === 'light'
                    ? `var(--chakra-colors-${getStatusColor().replace(
                        '.',
                        '-'
                      )})`
                    : getStatusColor().split('.')[0]
                  : colorMode === 'light'
                  ? `var(--chakra-colors-${getStatusColor().replace('.', '-')})`
                  : getStatusColor().split('.')[0]
              }`
            )
            .join(',')}
        />
        {connectionState === ConnectionState.CLOSED ||
        connectionState === ConnectionState.CONNECTING ? (
          <Button
            size="xs"
            onClick={() => startConnect()}
            isLoading={connectionState !== ConnectionState.CLOSED}
            disabled={apiKey.length === 0 || secretKey.length === 0}
            colorScheme="blue"
          >
            Connect
          </Button>
        ) : (
          <Button
            size="xs"
            colorScheme="blue"
            onClick={() => handleDisconnect()}
            isLoading={connectionState !== ConnectionState.CONNECTED}
          >
            Disconnect
          </Button>
        )}
      </HStack>
    );
  }

  return (
    <>
      <Box
        width="100%"
        sx={{ WebkitAppRegion: 'drag' }}
        bg={useColorModeValue('gray.100', 'gray.800')}
        height={10}
        pl={4}
      >
        <Flex h={10} alignItems="center" justifyContent="space-between">
          <Box>{GetTitleBar()}</Box>

          {connectionState !== ConnectionState.CONNECTED && (
            <Text>Connect to view personal statistics</Text>
          )}

          <Flex alignItems="center">
            <Stack
              direction="row"
              spacing={0}
              sx={{ WebkitAppRegion: 'no-drag' }}
            >
              <AuthButton />
              <ThemeSwitchButton />
              <MinimizeButton />
              <MaximizeButton />
              <CloseButton />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default TitleBar;
