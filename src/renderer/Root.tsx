import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/layout';
import App from './App';
import theme from './theme';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default function Root() {
  return (
    <BrowserRouter basename="/">
      <Providers>
        <Layout>
          <App />
        </Layout>
      </Providers>
    </BrowserRouter>
  );
}
