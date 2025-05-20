
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider as WagmiProviderLib } from 'wagmi';
import { config } from '../lib/wagmi';

// Create a React Query client
const queryClient = new QueryClient();

export const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProviderLib config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProviderLib>
  );
};

export default WagmiProvider;
