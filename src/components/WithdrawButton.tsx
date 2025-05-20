
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAccount } from "wagmi";
import { toast } from "sonner";

interface WithdrawButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isPending: boolean;
  balance: number;
}

export function WithdrawButton({ onClick, disabled = false, isPending, balance }: WithdrawButtonProps) {
  const { isConnected } = useAccount();
  
  const handleClick = () => {
    if (!isConnected) {
      toast.error("Veuillez connecter votre wallet");
      return;
    }
    
    if (balance <= 0) {
      toast.error("Pas de fonds à retirer");
      return;
    }
    
    onClick();
  };

  return (
    <Button
      onClick={handleClick}
      disabled={!isConnected || disabled || isPending || balance <= 0}
      variant="outline"
      className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
    >
      {isPending ? (
        <>
          <div className="animate-spin h-4 w-4 border-2 border-secondary border-t-transparent rounded-full mr-2" />
          Retrait en cours...
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          {balance > 0 ? `Retirer ${balance.toFixed(4)} ETH` : "Aucun fonds à retirer"}
        </>
      )}
    </Button>
  );
}
