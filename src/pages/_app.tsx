import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { SearchProvider } from '../contexts/SearchContext';
import theme from '../styles/theme';
import { AppProps } from 'next/app';
import '../styles/globals.css'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Component {...pageProps} />
      </ChakraProvider>
    </SearchProvider>
  );
}

export default MyApp
