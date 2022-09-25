import { Box, VStack } from '@chakra-ui/react';

import TitleBar from './title-bar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Box width="100vw" height="100vh">
      <VStack h="100%" w="100%" spacing={0}>
        <TitleBar />
        {children}
      </VStack>
    </Box>
  );
};

export default Layout;
