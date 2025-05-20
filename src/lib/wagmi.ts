
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

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
  // Implement storage with proper type handling
  storage: {
    getItem: (key) => {
      const item = localStorage.getItem(key);
      if (item === null) return undefined;
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    },
    setItem: (key, value) => {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
    key: (index) => localStorage.key(index) || '',
  },
});
