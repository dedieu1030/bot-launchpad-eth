
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useAccount } from "wagmi";
import { toast } from "sonner";

interface StartButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isPending: boolean;
  status: 'inactive' | 'active' | 'paused';
}

export function StartButton({ onClick, disabled = false, isPending, status }: StartButtonProps) {
  const { isConnected } = useAccount();
  
  const handleClick = () => {
    if (!isConnected) {
      toast.error("Veuillez connecter votre wallet");
      return;
    }
    
    if (status === 'active') {
      toast.info("Le bot est déjà actif");
      return;
    }
    
    onClick();
  };

  return (
    <Button
      onClick={handleClick}
      disabled={!isConnected || disabled || isPending || status === 'active'}
      className="bg-success hover:bg-success/90 text-success-foreground"
    >
      {isPending ? (
        <>
          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
          Démarrage...
        </>
      ) : status === 'active' ? (
        "Bot actif"
      ) : (
        <>
          <Play className="mr-2 h-4 w-4" />
          Démarrer le bot
        </>
      )}
    </Button>
  );
}
