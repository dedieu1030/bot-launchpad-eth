
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { createStorage } from 'wagmi/storage';

// Vérifiez si nous sommes en production
const isProd = import.meta.env.PROD;

// Create wagmi config
export const config = createConfig({
  chains: isProd ? [mainnet] : [sepolia, mainnet],
  connectors: [
    injected(),
    walletConnect({
      projectId: '971e512cca9131ec36ef2ad2cfcc5794', // Remplacer par votre propre projectId de WalletConnect
      metadata: {
        name: 'BotLauncher',
        description: 'Déploie ton bot Ethereum en un clic',
        url: 'https://botlauncher.app',
        icons: ['https://botlauncher.app/favicon.ico'],
      },
    }),
    coinbaseWallet({
      appName: 'BotLauncher',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  storage: createStorage({ storage: window.localStorage }),
});
