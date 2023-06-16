import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css'; // add bootstrap css
import Metadata from '@/components/Metadata'; // Metadata head
import LayoutView from '@/views/LayoutView';
// redux
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

// rainbowkit
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi';
import { bscTestnet, bsc, mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

export default function App({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [bscTestnet, bsc, mainnet],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: 'NFT Equity',
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: '#01B47E',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
      >
        <Provider store={store}>
          <Metadata />
          <LayoutView>
            <Component {...pageProps} />
          </LayoutView>
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
