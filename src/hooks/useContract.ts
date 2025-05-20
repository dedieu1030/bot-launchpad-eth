
import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { botABI } from '../lib/contractABI';
import { formatEther, parseEther } from 'viem';
import { toast } from 'sonner';

export function useContract(contractAddress: string) {
  const { address } = useAccount();
  const [isInvesting, setIsInvesting] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const { data: balance } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: botABI,
    functionName: 'getBalance',
    account: address,
    enabled: !!address && !!contractAddress,
  });

  const { data: isRunning } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: botABI,
    functionName: 'isRunning',
    account: address,
    enabled: !!address && !!contractAddress,
  });

  const { writeContract: writeInvest, data: investHash } = useWriteContract();
  const { writeContract: writeStart, data: startHash } = useWriteContract();
  const { writeContract: writeWithdraw, data: withdrawHash } = useWriteContract();

  const { isSuccess: isInvestSuccess, isError: isInvestError } = useWaitForTransactionReceipt({
    hash: investHash,
    enabled: !!investHash,
  });

  const { isSuccess: isStartSuccess, isError: isStartError } = useWaitForTransactionReceipt({
    hash: startHash,
    enabled: !!startHash,
  });

  const { isSuccess: isWithdrawSuccess, isError: isWithdrawError } = useWaitForTransactionReceipt({
    hash: withdrawHash,
    enabled: !!withdrawHash,
  });

  const invest = async (amount: number) => {
    if (!address) {
      toast.error("Wallet non connecté");
      return;
    }

    try {
      setIsInvesting(true);
      
      writeInvest({
        address: contractAddress as `0x${string}`,
        abi: botABI,
        functionName: 'invest',
        value: parseEther(amount.toString()),
      });

      toast.success("Transaction d'investissement envoyée");
    } catch (error) {
      console.error("Erreur d'investissement:", error);
      toast.error("Échec de l'investissement");
    } finally {
      setIsInvesting(false);
    }
  };

  const start = async () => {
    if (!address) {
      toast.error("Wallet non connecté");
      return;
    }

    try {
      setIsStarting(true);
      
      writeStart({
        address: contractAddress as `0x${string}`,
        abi: botABI,
        functionName: 'start',
      });

      toast.success("Transaction de démarrage envoyée");
    } catch (error) {
      console.error("Erreur de démarrage:", error);
      toast.error("Échec du démarrage");
    } finally {
      setIsStarting(false);
    }
  };

  const withdraw = async () => {
    if (!address) {
      toast.error("Wallet non connecté");
      return;
    }

    try {
      setIsWithdrawing(true);
      
      writeWithdraw({
        address: contractAddress as `0x${string}`,
        abi: botABI,
        functionName: 'withdraw',
      });

      toast.success("Transaction de retrait envoyée");
    } catch (error) {
      console.error("Erreur de retrait:", error);
      toast.error("Échec du retrait");
    } finally {
      setIsWithdrawing(false);
    }
  };

  return {
    balance: balance ? Number(formatEther(balance.toString())) : 0,
    isRunning: isRunning ?? false,
    invest,
    start,
    withdraw,
    isInvesting: isInvesting || !!investHash,
    isStarting: isStarting || !!startHash,
    isWithdrawing: isWithdrawing || !!withdrawHash,
  };
}
