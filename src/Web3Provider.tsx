import { WagmiProvider, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [base],
    transports: {
      // RPC URL for each chain
      [base.id]: http(
        `https://base.blockpi.network/v1/rpc/public`,
      ),
    },

    // Required API Keys
    walletConnectProjectId: '8acb8ab42286b5fb6c4f1e8c5d3bd734',

    // Required App Info
    appName: "Base Drop Bot",

    // Optional App Info
    appDescription: "Base Drop Telegram Bot",
    appUrl: "https://telegram-mini-app-theta-ruddy.vercel.app/", // your app's url
    appIcon: "https://telegram-mini-app-theta-ruddy.vercel.app/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};