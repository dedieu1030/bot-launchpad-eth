
import React, { createContext, useContext, useState, ReactNode } from 'react';

type BotStatus = 'inactive' | 'active' | 'paused';

interface Bot {
  id: string;
  name: string;
  slug: string;
  description: string;
  minInvestment: number;
  status: BotStatus;
  contractAddress: string;
}

interface Transaction {
  id: string;
  hash: string;
  type: 'deposit' | 'withdraw' | 'start' | 'stop';
  amount?: number;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  botId: string;
}

interface AppState {
  currentBot: Bot | null;
  userBots: Bot[];
  transactions: Transaction[];
  earnings: number;
  invested: number;
}

interface AppStateContextValue {
  appState: AppState;
  setCurrentBot: (bot: Bot | null) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  updateBotStatus: (botId: string, status: BotStatus) => void;
  updateEarnings: (amount: number) => void;
  updateInvested: (amount: number) => void;
}

const defaultAppState: AppState = {
  currentBot: null,
  userBots: [],
  transactions: [],
  earnings: 0,
  invested: 0,
};

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [appState, setAppState] = useState<AppState>(defaultAppState);

  const setCurrentBot = (bot: Bot | null) => {
    setAppState(prev => ({ ...prev, currentBot: bot }));
  };

  const addTransaction = (transaction: Transaction) => {
    setAppState(prev => ({
      ...prev,
      transactions: [transaction, ...prev.transactions],
    }));
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setAppState(prev => ({
      ...prev,
      transactions: prev.transactions.map(tx =>
        tx.id === id ? { ...tx, ...updates } : tx
      ),
    }));
  };

  const updateBotStatus = (botId: string, status: BotStatus) => {
    setAppState(prev => ({
      ...prev,
      userBots: prev.userBots.map(bot =>
        bot.id === botId ? { ...bot, status } : bot
      ),
      currentBot: prev.currentBot && prev.currentBot.id === botId
        ? { ...prev.currentBot, status }
        : prev.currentBot,
    }));
  };

  const updateEarnings = (amount: number) => {
    setAppState(prev => ({ ...prev, earnings: amount }));
  };

  const updateInvested = (amount: number) => {
    setAppState(prev => ({ ...prev, invested: amount }));
  };

  return (
    <AppStateContext.Provider
      value={{
        appState,
        setCurrentBot,
        addTransaction,
        updateTransaction,
        updateBotStatus,
        updateEarnings,
        updateInvested,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
