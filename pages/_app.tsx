import '../styles/globals.css';
import '@fontsource/space-grotesk/variable.css';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
