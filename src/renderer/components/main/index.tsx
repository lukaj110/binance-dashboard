/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Center,
  CircularProgress,
  Divider,
  Flex,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stat,
  StatArrow,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import {
  useGetExchangeInfo,
  useGetFutureAccountTransactionHistory,
} from 'renderer/authentication/hooks';
import { ConnectionState } from 'renderer/constants';
import { BINANCE_SOCKET, BINANCE_SOCKET_STATE, TICKERS } from 'renderer/state';
import { IndividualSymbolTickerData } from 'types';

const Main = () => {
  const { data: futureData } = useGetFutureAccountTransactionHistory();
  const { data: exchangeData } = useGetExchangeInfo();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [connectionState] = useAtom(BINANCE_SOCKET_STATE);
  const [socket] = useAtom(BINANCE_SOCKET);
  const [subscribedTickers, setSubscribedTickers] = useState<string[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<string>('');
  const [tickerData, setTickerData] = useAtom(TICKERS);

  const { colorMode } = useColorMode();
  const getHourlyIncome = () => {
    if (futureData) {
      const hourlyIncome = futureData.filter((item) => {
        if (item.asset !== 'USDT') return false;
        const date = new Date();
        date.setHours(date.getHours() - 1);
        return item.time >= date.getTime();
      });

      return hourlyIncome
        .reduce((acc, item) => acc + parseFloat(item.income), 0)
        .toFixed(2);
    }
    return '0';
  };

  const getDailyIncome = () => {
    if (futureData) {
      const dailyIncome = futureData.filter((item) => {
        if (item.asset !== 'USDT') return false;
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return item.time >= date.getTime();
      });

      return dailyIncome
        .reduce((acc, item) => acc + parseFloat(item.income), 0)
        .toFixed(2);
    }
    return '0';
  };

  const getWeeklyIncome = () => {
    if (futureData) {
      const weeklyIncome = futureData.filter((item) => {
        if (item.asset !== 'USDT') return false;
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return item.time >= date.getTime();
      });

      return weeklyIncome
        .reduce((acc, item) => acc + parseFloat(item.income), 0)
        .toFixed(2);
    }
    return '0';
  };

  const getMonthlyIncome = () => {
    if (futureData) {
      const monthlyIncome = futureData.filter((item) => {
        if (item.asset !== 'USDT') return false;
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return item.time >= date.getTime();
      });

      return monthlyIncome
        .reduce((acc, item) => acc + parseFloat(item.income), 0)
        .toFixed(2);
    }
    return '0';
  };

  const getIndicator = (income: number) => {
    if (income > 0.0) return 'increase';
    if (income < 0.0) return 'decrease';
    return undefined;
  };

  const getAllSymbols = () => {
    return exchangeData?.symbols
      .filter(
        (item) =>
          !subscribedTickers.includes(item.symbol) && item.quoteAsset === 'USDT'
      )
      .map((item) => {
        return {
          symbol: item.symbol,
          label: `${item.baseAsset} / ${item.quoteAsset}`,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  };

  useEffect(() => {
    if (connectionState === ConnectionState.CONNECTED && socket) {
      socket.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: subscribedTickers.map(
            (item) => `${item.toLowerCase()}@ticker`
          ),
        })
      );
      socket.onmessage = (event) => {
        if (JSON.parse(event.data).stream) {
          const data = JSON.parse(event.data)
            .data as IndividualSymbolTickerData;

          if (data) {
            setTickerData((prev) => {
              return {
                ...prev,
                [data.s]: data,
              };
            });
          }
        }
      };
    }
  }, [connectionState]);

  useEffect(() => {
    setSubscribedTickers(
      localStorage.getItem('subscribedTickers')?.split(';') || []
    );

    return () => {
      if (subscribedTickers.length > 0) {
        localStorage.setItem(
          'subscribedTickers',
          subscribedTickers.filter((t) => t.length > 0).join(';')
        );
        if (connectionState === ConnectionState.CONNECTED) {
          socket?.send(
            JSON.stringify({
              method: 'UNSUBSCRIBE',
              params: subscribedTickers.map(
                (item) => `${item.toLowerCase()}@ticker`
              ),
            })
          );
        }
      }
    };
  }, []);

  useEffect(() => {
    if (subscribedTickers.length > 0) {
      localStorage.setItem(
        'subscribedTickers',
        subscribedTickers.filter((t) => t.length > 0).join(';')
      );
      if (connectionState === ConnectionState.CONNECTED) {
        socket?.send(
          JSON.stringify({
            method: 'SUBSCRIBE',
            params: subscribedTickers.map(
              (item) => `${item.toLowerCase()}@ticker`
            ),
          })
        );
      }
    }
  }, [subscribedTickers]);

  function formatNumber(num: number, roundTo: number) {
    return num
      .toFixed(roundTo)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <Flex width="100%" height="100%" p={8} gap={4}>
      <Flex
        flexGrow={1}
        height="100%"
        alignContent="space-between"
        flexDirection="column"
      >
        <Text mb={4}>Cryptocurrency Prices</Text>
        {exchangeData ? (
          <TableContainer h="100%">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Change</Th>
                  <Th isNumeric>% Change</Th>
                  <Th isNumeric>Volume (24h)</Th>
                  <Th isNumeric>Total trades</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tickerData &&
                  Object.values(tickerData)
                    .sort((a, b) => b.n - a.n)
                    .map((ticker) => {
                      return (
                        <Tr key={ticker.s}>
                          <Td>{ticker.s.split('USDT').join(' / USDT')}</Td>
                          <Td isNumeric>
                            {formatNumber(parseFloat(ticker.c), 2)} $
                          </Td>
                          <Td isNumeric>
                            {formatNumber(parseFloat(ticker.p), 2)} $
                          </Td>
                          <Td isNumeric>
                            {formatNumber(parseFloat(ticker.P), 2)} %
                          </Td>
                          <Td isNumeric>
                            {formatNumber(parseInt(ticker.v + ticker.q, 10), 0)}{' '}
                            {ticker.s.split('USDT')[0]}
                          </Td>
                          <Td isNumeric>{formatNumber(ticker.n, 0)}</Td>
                        </Tr>
                      );
                    })}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Center h="100%">
            <CircularProgress
              isIndeterminate
              color="purple.400"
              thickness="5px"
              stroke="transparent"
            />
          </Center>
        )}

        <Divider mb={4} />
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          pr={4}
        >
          <Text verticalAlign="middle">Add a symbol to track changes.</Text>
          <IconButton
            size="sm"
            aria-label="Add Tracker"
            icon={<MdAdd />}
            onClick={onOpen}
          />
        </Flex>
      </Flex>
      {futureData && futureData.length > 0 && (
        <HStack height="100%" spacing={8}>
          <Divider
            orientation="vertical"
            opacity={colorMode === 'light' ? 1 : 0.6}
          />
          <Flex direction="column" height="100%" justifyContent="space-between">
            <Text>Futures earnings</Text>
            <VStack
              spacing={4}
              textAlign="right"
              alignItems="end"
              alignSelf="end"
            >
              <Stat>
                <StatLabel>
                  Hourly income{' '}
                  {parseFloat(getHourlyIncome()) !== 0 && (
                    <StatArrow
                      margin={0}
                      type={getIndicator(parseFloat(getHourlyIncome()))}
                    />
                  )}
                </StatLabel>
                <StatNumber>{getHourlyIncome()} $</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>
                  Daily income{' '}
                  {parseFloat(getDailyIncome()) !== 0 && (
                    <StatArrow
                      margin={0}
                      type={getIndicator(parseFloat(getDailyIncome()))}
                    />
                  )}
                </StatLabel>
                <StatNumber>{getDailyIncome()} $</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>
                  Weekly income{' '}
                  {parseFloat(getWeeklyIncome()) !== 0 && (
                    <StatArrow
                      margin={0}
                      type={getIndicator(parseFloat(getWeeklyIncome()))}
                    />
                  )}
                </StatLabel>
                <StatNumber>{getWeeklyIncome()} $</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>
                  Monthly income{' '}
                  {parseFloat(getMonthlyIncome()) !== 0 && (
                    <StatArrow
                      margin={0}
                      type={getIndicator(parseFloat(getMonthlyIncome()))}
                    />
                  )}
                </StatLabel>
                <StatNumber>{getMonthlyIncome()} $</StatNumber>
              </Stat>
            </VStack>
          </Flex>
        </HStack>
      )}

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a symbol</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <VStack spacing={4}>
              <Select
                onChange={(event) => {
                  if (
                    event.target &&
                    event.target.value &&
                    event.target.value.length > 0
                  ) {
                    setSelectedTicker(event.target?.value);
                  }
                }}
              >
                {getAllSymbols()?.map((item) => (
                  <option key={item.symbol} value={item.symbol}>
                    {item.label}
                  </option>
                ))}
              </Select>
              <Button
                colorScheme="green"
                onClick={() => {
                  setSubscribedTickers([...subscribedTickers, selectedTicker]);
                  onClose();
                }}
              >
                Add Symbol
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Main;
