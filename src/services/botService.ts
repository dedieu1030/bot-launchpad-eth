
export interface Bot {
  id: string;
  name: string;
  slug: string;
  description: string;
  minInvestment: number;
  yield: string;
  contractAddress: string;
}

// Ces données sont mockées pour la démo
const bots: Bot[] = [
  {
    id: '1',
    name: 'DeFi Yield Optimizer',
    slug: 'defi-yield-optimizer',
    description: 'Optimise automatiquement les rendements DeFi sur différents protocoles comme Aave, Compound et Curve.',
    minInvestment: 0.5,
    yield: '+12-18% APY',
    contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  },
  {
    id: '2',
    name: 'Arbitrage DEX Pro',
    slug: 'arbitrage-dex-pro',
    description: 'Exploite les différences de prix entre les DEX pour générer des profits sur les arbitrages.',
    minInvestment: 0.75,
    yield: '+8-15% APY',
    contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  },
  {
    id: '3',
    name: 'MEV Flash Bot',
    slug: 'mev-flash-bot',
    description: 'Capture la valeur extractible du mempool (MEV) avec des transactions flash optimisées.',
    minInvestment: 1,
    yield: '+20-30% APY',
    contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  },
  {
    id: '4',
    name: 'Stablecoin Strategy',
    slug: 'stablecoin-strategy',
    description: 'Stratégie à faible risque basée sur des stablecoins avec rendement constant et protection contre la volatilité.',
    minInvestment: 0.25,
    yield: '+5-7% APY',
    contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  }
];

export const getBots = (): Bot[] => {
  return bots;
};

export const getBot = (slug: string): Bot | undefined => {
  return bots.find(bot => bot.slug === slug);
};

// Données mockées pour les transactions
export interface Transaction {
  id: string;
  hash: string;
  type: 'deposit' | 'withdraw' | 'start' | 'stop';
  amount?: number;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  botId: string;
}

const transactions: Transaction[] = [
  {
    id: 't1',
    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    type: 'deposit',
    amount: 0.5,
    timestamp: Date.now() - 3600000 * 24 * 3,
    status: 'confirmed',
    botId: '1'
  },
  {
    id: 't2',
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    type: 'start',
    timestamp: Date.now() - 3600000 * 24 * 3,
    status: 'confirmed',
    botId: '1'
  },
  {
    id: 't3',
    hash: '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
    type: 'withdraw',
    amount: 0.57,
    timestamp: Date.now() - 3600000 * 24 * 1,
    status: 'pending',
    botId: '1'
  }
];

export const getTransactions = (): Transaction[] => {
  return transactions;
};
