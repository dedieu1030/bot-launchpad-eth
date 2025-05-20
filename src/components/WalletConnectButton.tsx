
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Wallet } from "lucide-react";
import { toast } from "sonner";

export function WalletConnectButton() {
  const { isConnected, address } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    try {
      connect({ connector: connectors[0] });
      toast.success("Portefeuille connecté");
    } catch (error) {
      toast.error("Échec de connexion du portefeuille");
      console.error("Erreur de connexion:", error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.info("Portefeuille déconnecté");
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-sm text-muted-foreground">
          {formatAddress(address)}
        </span>
        <Button
          onClick={handleDisconnect}
          variant="outline"
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Déconnecter</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isPending}
      className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
    >
      {isPending ? (
        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        <Wallet className="w-4 h-4" />
      )}
      <span>Connecter wallet</span>
    </Button>
  );
}
