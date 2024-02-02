import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

import ActiveWeb3Provider from "./contexts/Web3Context";
import { Web3Provider } from "@ethersproject/providers";
// import GA from './utils/GoogleAnalytics'
import { useAnalytics } from "./utils/GoogleAnalytics";
import { Wrapper } from "./components/Wrapper";

//rainbowkit
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  // opBNB,
  // avax,
  // etc,
  // op,
  // arb,
  mantle,
  base,
  scroll,
  goerli,
  sepolia,
} from "wagmi/chains";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  ledgerWallet,
  phantomWallet,
  okxWallet,
} from "@rainbow-me/rainbowkit/wallets";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, mantle, base, scroll, goerli, sepolia],
  [
    alchemyProvider({ apiKey: "2XseyLBOGKS5JJaYdROTvi-ZgP9UcGYC" }),
    publicProvider(),
  ]
);
const projectId =
  process.env.REACT_APP_PROJECT_ID || "e89228fed40d4c6e9520912214dfd68b";

const connectors = connectorsForWallets([
  {
    groupName: "bidify.org",
    wallets: [
      metaMaskWallet({ projectId, chains, shimDisconnect: true }),
      phantomWallet({ chains }),
      walletConnectWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
      okxWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function App() {
  const { initialized } = useAnalytics();
  return (
    // <div>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ActiveWeb3Provider>
          <BrowserRouter>
            <Wrapper initialized={initialized} />
            <Routes>
              {/* { GA.init() && <GA.RouteTracker /> } */}
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </ActiveWeb3Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
