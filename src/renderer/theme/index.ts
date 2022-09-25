import {
  extendTheme,
  theme as base,
  ThemeConfig,
  ChakraTheme,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: ChakraTheme) => ({
      body: {
        bg: mode('white', 'gray.900')(props),
      },
    }),
  },
  fonts: {
    heading: `Roboto Mono, ${base.fonts.heading}`,
    body: `Roboto Mono, ${base.fonts.body}`,
  },
});

export default theme;
